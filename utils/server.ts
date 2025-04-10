import express, { Application } from 'express';
import path from 'path';
import fs from 'fs-extra';
import { exec } from 'child_process';
import chokidar, { FSWatcher } from 'chokidar';
import { Server } from 'http';
import { promisify } from 'util'
// Maybe include logging and opentelemetry?

/* 
    WORKFLOW:
    1. Initially Build to Staging Directory, then
*/

export async function webServer() {
    let srv: Server = undefined; 
    const app: Application = express();
    const BASE_DIR: string = path.resolve(__dirname, '../');
    const address: URL = new URL(
        process.env.ADDRESS || 'http://localhost:3000'
    );

    const [PUBLIC_DIR, STAGING_DIR, CACHE_DIR] = [ 
        'public', 'staging', 'cache'
    ].map(d => path.join(BASE_DIR, d)) as [string, string, string];

    const watcher: FSWatcher = chokidar.watch(
        ['blog', 'src', 'static'].map(d => path.join(BASE_DIR, d)), 
        { persistent: true }
    );

    async function build() {
        // Build people.yaml and authors.yaml in here

        const { stdout, stderr } = await promisify(exec)(
            `yarn build --out-dir ${STAGING_DIR}`
        );

        console.info(stdout);
        if (stderr) throw new Error(stderr);

        srv?.close(); 
        srv = undefined;
        console.info(`Server at ${address.href} Closed`);
        
        if((await fs.stat(PUBLIC_DIR)).isDirectory()) {
            await fs.rename(PUBLIC_DIR, CACHE_DIR);
        }
        
        await fs.rename(STAGING_DIR, PUBLIC_DIR);
        await fs.remove(CACHE_DIR); 
    }

    async function handleException(e: Error) {
        console.error("Build process failed: ", e);

        if((await fs.stat(STAGING_DIR)).isDirectory()) {
            await fs.remove(STAGING_DIR);
        }

        if((await fs.stat(CACHE_DIR)).isDirectory()) {
            await fs.rename(CACHE_DIR, PUBLIC_DIR);
        }
    }

    watcher.on('change', async (_) => {
        try { await build(); }
        catch (e) { await handleException(e); }

        if(!srv) {
            app.use(express.static(PUBLIC_DIR));
            srv = app.listen(parseInt(address.port), address.origin, () => {});
            console.info(`Server Running at ${address.href}`);
        }
    });
};

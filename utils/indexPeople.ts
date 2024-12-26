import { load } from 'js-yaml';
import { globSync } from 'fast-glob'
import path from 'path';
import fs from 'fs';

export default function indexPeople() {
    let people = Object.fromEntries([
        'Faculty', 
        'Graduate Students',
        'Undergraduate Students',
        'Affiliated Faculty',
        'Past Graduates',
        'Other Alumni'
    ].map((category) => [category, []]));

    globSync('src/pages/people/*/info.yaml').forEach((p) => {
        const [k, v] = Object.entries(load(
            fs.readFileSync(p, 'utf8')
        ))[0];

        if (!people?.[v['title']]) {
            people[v['title']] = [];
        }

        if(v?.image_url) {
            fs.copyFileSync(
                path.join(path.dirname(p), v['image_url']),
                path.join('./static/profiles', v['image_url'])
            );

            v['image_url'] = path.join('profiles', v['image_url']);
        }

        else {
            v['image_url'] = 'logo.svg';
        };

        v['slug'] = path.basename(path.dirname(p));

        people[v['title']].push({[k]: v});
    });

    return people;
};
import Layout from '@theme/Layout';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function Research() {    
    return (
        <Layout>
            <Tabs>
                <TabItem value="topics" label="Topics" default>
                    This is an apple 🍎
                </TabItem>
                <TabItem value="projects" label="Projects">
                    This is an orange 🍊
                </TabItem>
                <TabItem value="publications" label="Publications">
                    This is a banana 🍌
                </TabItem>
            </Tabs>
        </Layout>
    );
};
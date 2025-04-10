import Layout from '@theme/Layout';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';

export default function Research() {  
    const links = {
        "Knowledge Graphs": "knowledge-graphs",
        "Knowledge Representation and Reasoning": "knowledge-rr",
        "Modular Ontology Engineering": "modular-ontology-engineering",
        "Neuro-Symbolic and Explainable Artificial Intelligence": "nesy-and-explainable-ai"
      };
    
    return (
        <Layout>
            <Tabs>
                <TabItem value="topics" label="Topics" default>
                    <ul>
                        {Object.entries(links).map(([label, path]) => (
                            <li key={path}>
                                <Link to={`/research/${path}`}>{label}</Link>
                            </li>
                        ))}
                    </ul>
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
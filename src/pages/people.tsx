import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { JSX } from "react";

const PhotoGrid = ({ category, p_list }): JSX.Element => {
    return (
        <div className='gridGroup'>
            <h1>{category}</h1>
            <div className='gridSection'>
                {Object.values(p_list).map((v, i) => {
                    const [name, data] = Object.entries(v)[0];
                    return (
                        <Link 
                            href={`/people/${data.slug}`} 
                            className='profileLink'
                            key={i}
                        >
                            <img 
                                className='profileImg' 
                                src={data.image_url} 
                            />
                            <p>{name}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default function People(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    const people = siteConfig.customFields.people;

    return (
        <Layout title={'People'}>
            <div className='gridLayout'>
                {Object.entries(people).map(([group, p], i) => (
                    <PhotoGrid category={group} p_list={p} key={i} />
                ))}
            </div>
        </Layout>
    );
};
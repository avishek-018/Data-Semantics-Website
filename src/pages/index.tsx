import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import Layout from '@theme/Layout';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { JSX } from "react";

const SliderContainer = ({homepage}): JSX.Element => {
  return (
    <div className='sliderContainer'>
      <Slider {...homepage?.slider}>
        {homepage?.photos?.map((entry, index) => (
          <div key={index}>
            <img src={`homepage/${entry.image}`} />
            <center><p>{entry.caption}</p></center>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const homepage = siteConfig.customFields.homepage;

  return (
    <Layout>
      <div className='parent'>
        <SliderContainer homepage={homepage} />
        <div className='infoContainer'>
        {['about', 'address'].map((c, i) => (
          <ReactMarkdown 
            key={i}
            remarkPlugins={[remarkBreaks]} 
            children={homepage[c]} 
          />
        ))}
        </div>
      </div>
    </Layout>
  );
};

import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import Layout from '@theme/Layout';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { JSX, useState, useEffect, useCallback } from "react";

const SliderContainer = ({homepage}): JSX.Element => {
  const [w, setW] = useState(null);
  const [height, setHeight] = useState<number | null>(null);

  const resizeSlider = useCallback(e => {
    setW(
      window.innerWidth <= 996 ? "100%" : 
      Math.floor(window.innerWidth / 2) + "px"
    );
  }, []);
  
  useEffect(() => {
    resizeSlider(null);

    window.addEventListener('resize', resizeSlider);
    return () => {
        window.removeEventListener('resize', resizeSlider);
    };
  }, [resizeSlider]);

  useEffect(() => {
    const img = document.querySelector(".slick-slider img") as HTMLElement | null;
    if (!img) return;
  
    const observer = new ResizeObserver(() => {
      const rect = img.getBoundingClientRect();
      setHeight(Math.floor((rect.bottom - rect.top) / 2));
    });
  
    observer.observe(img);
    return () => observer.disconnect();
  }, []);

  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, top: height}}
        onClick={onClick}
      />
    );
  }

  const slider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />
  };

  return (
    <div className='sliderContainer' style={{width: w}}>
      <Slider {...slider}>
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
        <div className='infoContainer'>
          <h1>About</h1>
          {['about', 'address'].map((c, i) => (
            <ReactMarkdown 
              key={i}
              remarkPlugins={[remarkBreaks]} 
              children={homepage[c]} 
            />
          ))}
        </div>
        <SliderContainer homepage={homepage} />
      </div>
    </Layout>
  );
};

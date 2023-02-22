import React from 'react';

import Greeting from '../components/Greeting/greeting';
import Banner from '../components/Banner/banner';

import bannerImg1 from '../img/banner1.png';
import bannerImg2 from '../img/banner2.png';
import bannerImg3 from '../img/banner3.png';

export default function Home() {
  return (
    <>
      <Greeting />
      <div className="banners">
        <Banner
            image={bannerImg1}
            alt="Торты для собак"
            size="big" />
        <Banner
            image={bannerImg2}
            alt="Новинки"
            size="small" />
        <Banner
            image={bannerImg3}
            alt="Миски"
            size="small" />
      </div>
    </>
  );
}
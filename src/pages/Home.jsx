import React from 'react';

import Greeting from '../components/Greeting/greeting';
import Banner from '../components/Banner/banner';

import bannerImg1 from '../img/banner1.png';

export default function Home() {
  return (
    <>
      <Greeting />
      <div className="banners">
        <Banner
            // image="https://i.imgur.com/EYs95hi.png"
            image={bannerImg1}
            alt="Торты для собак"
            size="big" />
        <Banner
            image="https://i.imgur.com/cL1GxdP.png"
            alt="Новинки"
            size="small" />
        <Banner
            image="https://i.imgur.com/G2trEk2.png"
            alt="Миски"
            size="small" />
      </div>
    </>
  );
}
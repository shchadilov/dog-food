import React from 'react';
import './banner.css';

export default function Banner({ image, url, alt, size }) {
  function BannerDiv() {
    return (
        <div className={'banner' + (size && ` banner_${size}`)}>
          <img src={image} alt={alt} />
        </div>
    );
  }

  return (
    url ?
    <a href={url} className={'banner-link' + (size && ` banner-link_${size}`)}>
      <BannerDiv />
    </a> :
    <BannerDiv />
  )  
}

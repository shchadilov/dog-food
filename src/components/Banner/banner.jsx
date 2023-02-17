import React from 'react';
import './banner.css';

export default function Banner({ image, url, alt, size }) {
  function addLink(divElement) {
    if (url) {
      return (
        <a href={url} className={'banner-link' + (size && ` banner-link_${size}`)}>
          {divElement}
        </a>);
    } else {
      return <>{divElement}</>;
    }
  }

  function createDivElement() {
    return (
      <>
        <div className={'banner' + (size && ` banner_${size}`)}>
          <img src={image} alt={alt} />
        </div>
      </>
    );
  }

  return addLink(createDivElement());
}
import React from 'react';
import Container from '../container/Container';
import bannerImage1 from '../assets/images/banner-image1.PNG';

export default function CategoryBanner() {
  return (
    <Container>
        <div className='bann-wrap'>
            <div className='bann-sec-A'>
                <h2>Women’s Outerwear</h2>
                <div className='line'></div>
            </div>
            <div className='bann-sec-B'>
                <img src={bannerImage1} alt="banner"/>
            </div>
        </div>
    </Container>
  )
}

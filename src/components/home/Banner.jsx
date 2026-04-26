import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Button } from '@mui/material';
import apis from '../../utils/apis';
import httpAction from '../../utils/httpAction';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { resolveImageUrl } from '../../utils/imageUrl';
import './banner.css';

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const getBanners = async () => {
      const result = await httpAction({ url: apis().getBanner })(); 
      if (result?.status && result.banners?.length > 0) {
        setBanners(result.banners);
      }
    };
    getBanners();
  }, []);

  if (!banners.length) return null;

  const settings = {
    dots: true,
    infinite: true,
    fade: true, 
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="banner_slider_wrapper">
      <Slider {...settings}>
        {banners.map((banner, idx) => (
          <div className="banner_slide" key={idx}>
            <div
              className="banner_background"
              style={{
                backgroundImage: `url(${resolveImageUrl(banner.image)})`,
              }}
            >
              <div className="banner_overlay">
                <div className="banner_content_new">
                  <h2>{banner.title}</h2>
                  <p>{banner.subtitle}</p>
                  {banner.buttonLink && (
                    <Button
                      variant="contained"
                      className="banner_button"
                      href={banner.buttonLink}
                      target="_blank"
                    >
                      {banner.buttonText || 'Shop Now'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;

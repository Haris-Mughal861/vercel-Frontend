import React from 'react';
import './hero.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='hero_main'>
      <div className='hero_backdrop'>
        <h1 className='hero_heading'>
          Discover Unique Handmade Treasures from Pakistan
        </h1>
        <p className='hero_subheading'>
          Explore a vibrant collection of traditional crafts and exquisite handmade products
          that celebrate the rich heritage of Pakistan. Join us in supporting local artisans
          and find the perfect piece that speaks to your heart.
        </p>
        <div >
        <Button
  variant="contained"
  onClick={() => navigate('/shop')}
  sx={{
    backgroundColor: 'lightcoral',
    color: 'black',
    fontWeight: '600',
    padding: '8px 16px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#333',
      color: 'white'
    }
  }}
>
  Shop
</Button>

<Button
  variant="outlined"
  onClick={() => navigate('seller/register')}
  sx={{
    backgroundColor: 'lightcoral',
    color: 'black',
    fontWeight: '600',
    padding: '8px 16px',
    borderRadius: '4px',
    border: '1px solid white',
    marginLeft: '12px',
    '&:hover': {
      backgroundColor: '#333',
      color: 'white'
    }
  }}
>
  Become a Seller
</Button>

        </div>
      </div>
    </div>
  );
};

export default Hero;

/*import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'
export const Hero = () => {
  return (
    <div className='hero'>
       <div className="hero-left">
           <h2>NEW ARRIVALS ONLY</h2>
           <div>
            <div className="hero-hand-icon">
                <p>new</p>
                <img src={hand_icon} alt="" />
            </div>
            <p>collections</p>
            <p>for everyone</p>
           </div>
           <div className="hero-latest-btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
           </div>
       </div>

       <div className="hero-right">
          <img src={hero_image} alt="" />
       </div>
    </div>
  )
}*/


import React, { useContext, useState } from 'react';
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item';

export const Hero = () => {
  const { all_product } = useContext(ShopContext);
  const [showLatestCollection, setShowLatestCollection] = useState(false);

  // Sorting products by product ID in descending order
  const latestCollection = all_product.sort((a, b) => b.id - a.id).slice(0, 4);

  const toggleLatestCollection = () => {
    setShowLatestCollection(!showLatestCollection);
  };

  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn" onClick={toggleLatestCollection}>
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>

      {showLatestCollection && (
        <div className="latest-collection">
          <h1>Latest Products</h1>
          <hr />
          <div className="latest-products">
            {latestCollection.map((item, i) => (
              <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


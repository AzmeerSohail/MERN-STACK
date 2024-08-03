import React from 'react'
import './DescriptionBox.css'
export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
           <div className="descriptionbox-navigator">
                  <div className="descriptionbox-nav-box">Description</div>
                  <div className="descriptionbox-nav-box fade">Reviews (122)</div>
           </div>
           <div className="descriptionbox-description">
            <p>Welcome to our e-commerce website, your one-stop destination for all your shopping needs! 
                Dive into our vast array of products carefully curated to cater to every taste
                 and preference. Whether you're searching for the latest fashion trends 
                we've got you covered. With user-friendly navigation and secure payment options,
                 shopping with us is not just convenient but also enjoyable.</p>
                 <p>
                 Whether you're a seasoned shopper or new to the world of online retail, our 
                 dedicated customer support team is here to assist you every step of the way. 
                 Embrace the future of shopping with us and redefine the way you experience e-commerce.
                 </p>
           </div>
    </div>
  )
}

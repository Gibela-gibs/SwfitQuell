import React from 'react'
import './RideHero.css'
import dark_arrow from '../../assets/dark_arrow.png'
const Hero = () => {
  return (
    <div className='RideHero container'>
      <div className="RideHero-text">
        <h1>Experience the Speed of Swift Quell</h1>
        <p>
        Our dedicated team is driven by a shared passion 
        for enhancing the lives of our customers. We strive to 
        seamlessly connect passengers with available drivers,
         ensuring swift and reliable transportation to their 
         destinations. By leveraging our expertise and commitment, 
         we aim to provide a transformative journey that exceeds 
         expectations and fosters trust in our service.
        </p>
        <button className="btn">Get Started  <img src = {dark_arrow} alt = ''/> </button>
      </div>
    </div>
  )
}

export default Hero

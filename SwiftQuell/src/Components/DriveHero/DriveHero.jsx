import React from 'react'
import './DriveHero.css'
import dark_arrow from '../../assets/dark_arrow.png'
const DriveHero = () => {
  return (
    <div className='DriveHero'>
      <div className="DriveHero-text">
        <h1>See all the available riders on your route</h1>
        <p>Join our platform and revolutionize your taxi business. With our user-friendly 
          app, you can maximize your earnings and streamline your operations. Say goodbye 
          to empty seats and inefficient routes. With our technology, you'll have access 
          to a steady stream of passengers, ensuring that your taxi is always on the move. 
          Whether it's peak traffic or off-peak hours, our platform empowers you to fill your 
          taxi efficiently and keep your business thriving. Join us today and experience the 
          difference firsthand</p>
        <button className="btn">Get Started  <img src = {dark_arrow} alt = ''/> </button>
      </div>
    </div>
  )
}

export default DriveHero

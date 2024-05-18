import React from 'react'
import './BusinessHero.css'
import dark_arrow from '../../assets/dark_arrow.png'
const BusinessHero = () => {
  return (
    <div className='BusinessHero'>
    <div className="BusinessHero-text">
        <h1>Secure every available Minibus Taxi for your business needs</h1>
        <p>Unlock the power of accessibility and efficiency for your business with our 
            innovative solution. Seamlessly book every available Minibus Taxi, ensuring 
            smooth operations and timely transportation for your team or clients. Say 
            goodbye to delays and uncertainty; with our platform, you're in control of 
            your business's mobility like never before.</p>
        <button className="btn">Get Started  <img src = {dark_arrow} alt = ''/> </button>
      </div>
    </div>
  )
}

export default BusinessHero

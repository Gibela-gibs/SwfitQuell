import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import RideHero from './Components/RideHero/RideHero'
import DriveHero from './Components/DriveHero/DriveHero'
import BusinessHero from './Components/BusinessHero/BusinessHero'
import Footer from './Components/Footer/Footer'
const App = () => {
  return (
    <div>
      <Navbar/>
      <RideHero/>
      <DriveHero/>
      <BusinessHero/>
      <Footer/>
    </div>
  )
}

export default App

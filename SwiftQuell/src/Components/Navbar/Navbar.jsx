import React, { useEffect, useState } from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu_icon.png'

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []);

  const toggleMenu = () => {
    setMobileMenu(prevState => !prevState);
  }

  return (
    <nav 
      className={`container ${sticky ? 'dark-nav' : ''} ${isHovered ? 'dark-nav-hover' : ''}`} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='brandName'>Swift Quell</div>
      <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
        <li>Ride</li>
        <li>Drive</li>
        <li>Business</li>
        <li>About</li>
        <li>Help</li>
        <li>Log in</li>
        <li><button className='btn'>Sign up</button></li>
      </ul>
      <img src={menu_icon} alt='' className='menu-icon' onClick={toggleMenu}/>
    </nav>
  )
}

export default Navbar

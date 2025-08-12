import React, { useContext } from 'react'
import logo from '../assets/crypto-logo.png';
import arrow_icon from '../assets/arrow_icon.png';
import { CoinContext } from '../context/CoinContext';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        setCurrency({
          name: 'usd',
          Symbol: '$'
        });
        break;
      case "eur":
        setCurrency({
          name: 'eur',
          Symbol: '€'
        });
        break;
      case "inr":
        setCurrency({
          name: 'inr',
          Symbol: '₹'
        });
        break;
      default:
        setCurrency({
          name: 'usd',
          Symbol: '$'
        });
    }
  }

  return (
    <div className='flex items-center justify-between py-5 px-[4%] lg:px-[10%]  text-[#ddd] border-b border-2 border-[#3c3c3c]'>
      <Link to={'/'}><img className='max-w-[max(12vh,180px)] rounded-lg' src={logo} alt="Crypto Logo" /></Link>
      <ul className='hidden sm:flex gap-5 md:gap-10 '>
        <Link to={'/'}><li className='cursor-pointer'>Home</li></Link>
        <li className='cursor-pointer'>Features</li>
        <li className='cursor-pointer'>Pricing</li>
        <li className='cursor-pointer'>Blog</li>
      </ul>
      <div className=' flex items-center gap-3'>
        <select className='py-1.5 px-2 border-2 border-white rounded-lg' onChange={currencyHandler}>
          <option className='bg-[#09005c] text-white' value="usd">USD</option>
          <option className='bg-[#09005c] text-white' value="eur">EUR</option>
          <option className='bg-[#09005c] text-white' value="inr">INR</option>
        </select>
        <button className='flex items-center gap-2.5 py-2.5 px-4 md:px-6 text-base font-semibold text-[#393939] bg-white cursor-pointer rounded-3xl '>Sign up <img className='w-3' src={arrow_icon} alt="Arrow Icon" /></button>
      </div>
      
    </div>
  )
}

export default Navbar;

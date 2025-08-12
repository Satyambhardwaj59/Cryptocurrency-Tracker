import React from 'react'
import logo from '../assets/crypto-logo.png';
import arrow_icon from '../assets/arrow_icon.png';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-5 px-[10%] text-[#ddd] border-b border-2 border-[#3c3c3c]'>
      <img className='max-w-[max(12vh, 120px)] rounded-lg' src={logo} alt="Crypto Logo" />
      <ul className='flex gap-10 '>
        <li className='cursor-pointer'>Home</li>
        <li className='cursor-pointer'>Features</li>
        <li className='cursor-pointer'>Pricing</li>
        <li className='cursor-pointer'>Blog</li>
      </ul>
      <div className=' flex items-center gap-3'>
        <select className='py-1.5 px-2 border-2 border-white rounded-lg'>
          <option className='bg-[#09005c] text-white' value="usd">USD</option>
          <option className='bg-[#09005c] text-white' value="eur">EUR</option>
          <option className='bg-[#09005c] text-white' value="inr">INR</option>
        </select>
        <button className='flex items-center gap-2.5 py-2.5 px-6 text-base font-semibold text-[#393939] bg-white cursor-pointer rounded-3xl '>Sign up <img className='w-3' src={arrow_icon} alt="Arrow Icon" /></button>
      </div>
      
    </div>
  )
}

export default Navbar;

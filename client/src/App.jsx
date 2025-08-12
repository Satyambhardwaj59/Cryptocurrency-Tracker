import React from 'react'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Coin from './pages/Coin';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='min-h-[100vh] text-white bg-[linear-gradient(#0b004e,#1d152f,#002834)] '>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:coinId' element={<Coin />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

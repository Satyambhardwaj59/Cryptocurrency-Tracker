import React, { useContext, useState, useEffect } from 'react'
import { CoinContext } from '../context/CoinContext';
import {Link} from 'react-router-dom';

const Home = () => {

    const { allCoin, currency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState('');

    const inputHandler = (e) => {
        setInput(e.target.value);
        if (e.target.value === '') {
            setDisplayCoin(allCoin)
        }
    };

    const searchHandler = async (e) => {
        e.preventDefault();
        const coins = await allCoin.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase()) || item.symbol.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins);

    }

    useEffect(() => { setDisplayCoin(allCoin) }, [allCoin]);

    return (
        <div className='px-2.5 pb-24 '>
            <div className="max-w-[600px] my-20 mx-auto flex flex-col text-center items-center gap-7">
                <h1 className='text-[max(4vh,36px)] '>Largest <br /> Crypto Marketplace</h1>
                <p className='w-[90%] sm:w-3/4 text-[#e3e3e3]  leading-relaxed'>Welcome to the world's largest crypto marketplace. Sign up to explore more about cryptos.</p>
                <form onSubmit={searchHandler} className='p-2 w-[90%] sm:w-4/5 bg-white border-2 rounded-lg text-xl flex justify-center items-center gap-2.5 ' >
                    <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search crypto' required className='flex-1 text-base pl-2.5 outline-none border-none  text-gray-600' />

                    <datalist id='coinlist'>
                        {allCoin.map((item, index) => (<option key={index} value={item.name} />))}
                    </datalist>

                    <button className='border-none bg-[#7927ff] text-white text-base py-1.5 sm:py-2.5 px-3 sm:px-7 rounded-lg cursor-pointer' type='submit'>Search</button>
                </form>
            </div>
            <div className='max-w-[800px] m-auto rounded-2xl bg-[linear-gradient(rgba(84,3,255,0.15),rgba(105,2,153,0.15))]'>
                <div className="grid grid-cols-[0.5fr_3fr_1fr_1fr] sm:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-4 px-5 items-center border-b border-b-[#3c3c3c]">
                    <p className='text-xs sm:text-base '>S.No</p>
                    <p className='text-xs sm:text-base text-center'>Coins</p>
                    <p className='text-xs sm:text-base'>Price</p>
                    <p className='text-center text-xs sm:text-base'>24h Change</p>
                    <p className='hidden text-right sm:flex'>Market Cap</p>
                </div>
                {displayCoin.map((item, index) => {
                    return <Link to={`/coin/${item.id}`} key={index} className='grid grid-cols-[0.5fr_3fr_1fr_1fr] sm:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-4 px-5 items-center border-b border-b-[#3c3c3c] last:border-none'>
                        
                        <p>{item.market_cap_rank}</p>

                        <div className='flex text-xs sm:text-base items-center gap-2.5'>
                            <img className='w-6 sm:w-9' src={item.image} alt={item.name} />
                            <p>{item.name + ' - ' + item.symbol}</p>
                        </div>
                        <p className='text-xs sm:text-base'>{currency.Symbol} {item.current_price.toLocaleString()}</p>
                        <p className={`text-center ${item.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>{Math.floor(item.price_change_percentage_24h * 100) / 100}</p>
                        <p className='hidden sm:flex text-right'>{currency.Symbol} {item.market_cap.toLocaleString()}</p>
                    </Link>
                })}
            </div>

        </div>
    )
}

export default Home;

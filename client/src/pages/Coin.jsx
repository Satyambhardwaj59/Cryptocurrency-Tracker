import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CoinContext } from '../context/CoinContext';
import LineChart from '../components/LineChart';
import ShimmerUI from '../components/ShimmerUI';

const CoinGecko_API_Key = import.meta.env.VITE_CoinGecko_API_Key;


const Coin = () => {

  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': CoinGecko_API_Key }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': CoinGecko_API_Key }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency])

  if (coinData && historicalData) {
    return (
      <div className='px-5 '>
        <div className="flex flex-col items-center gap-5 my-20 mx-auto mb-12">
          <img className='max-w-[100px]' src={coinData?.image?.large} alt="" />
          <p className='text-12 font-semibold'>{coinData?.name} ({coinData?.symbol?.toUpperCase()})</p>
        </div>
        <div className="max-w-[600px] h-[250px] m-auto">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="max-w-[600px] my-12 mx-auto flex flex-col">
          <ul className='flex justify-between items-center border-b border-b-[#5f5d5f] py-2.5 list-none'>
            <li>Crypto Market Rank</li>
            <li>{coinData?.market_cap_rank}</li>
          </ul>
          <ul className='flex justify-between items-center border-b border-b-[#5f5d5f] py-2.5 list-none'>
            <li>Current Price</li>
            <li>{currency.Symbol} {coinData?.market_data?.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul className='flex justify-between items-center border-b border-b-[#5f5d5f] py-2.5 list-none'>
            <li>Market cap</li>
            <li>{currency.Symbol} {coinData?.market_data?.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul className='flex justify-between items-center border-b border-b-[#5f5d5f] py-2.5 list-none'>
            <li>24 Hour high</li>
            <li>{currency.Symbol} {coinData?.market_data?.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul className='flex justify-between items-center border-b border-b-[#5f5d5f] py-2.5 list-none'>
            <li>24 Hour low</li>
            <li>{currency.Symbol} {coinData?.market_data?.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    )
  } else {
    return <ShimmerUI />
  }


}

export default Coin

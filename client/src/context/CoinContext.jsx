import { createContext, useEffect, useState } from "react";
const Backend_URL = import.meta.env.VITE_Backend_URL;

export const CoinContext = createContext();

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: 'usd',
        Symbol: '$'
    });

    const fetchAllCoin = async () => {
        const responce = await fetch(`${Backend_URL}/api/coins`);
        const data = await responce.json();
        setAllCoin(data.data);
    }

    useEffect(() => {
        fetchAllCoin();

        // refresh every 30 minutes
        const interval = setInterval(() => {
            fetchAllCoin();
        }, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const contextValue = {
        allCoin,
        currency,
        setCurrency,
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )

};

export default CoinContextProvider;
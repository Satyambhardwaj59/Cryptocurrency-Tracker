import { createContext, useEffect, useState } from "react";
const Backend_URL = import.meta.env.VITE_Backend_URL;

export const CoinContext = createContext();

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([]);
    const [lastUpdate, setLastUpdate] = useState();
    const [currency, setCurrency] = useState({
        name: 'usd',
        Symbol: '$'
    });

    const fetchAllCoin = async () => {
        const responce = await fetch(`${Backend_URL}/api/coins`);
        const data = await responce.json();
        setLastUpdate(data.lastUpdated)
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

    // convert local time 
    const localTime = new Date(lastUpdate).toLocaleString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    const contextValue = {
        allCoin,
        currency,
        setCurrency,
        localTime
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )

};

export default CoinContextProvider;
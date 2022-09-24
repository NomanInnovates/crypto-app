import { useState, useEffect } from "react";
import Axios from "axios";

import "../App.css";
import Coin from "../Components/Coin";
import Refresh from "../Images/refresh.png";

function Home() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshPage();
  }, []);

  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const refreshPage = () => {
    setIsLoading(true);
    Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    ).then((response) => {
      setIsLoading(false);
      setCoins(response.data);
    });
  };


  return (
    <div className="App">
      <div className="headerContainer">
        <h1>Welcome to the CryptoChecker</h1>
        <div className="buttonContainer">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search for a Coin"
          />
          <img onClick={refreshPage} src={Refresh} alt="refresh page" />
        </div>
      </div>
      <div className="coinContainer">
        {isLoading ? <div><h1 className="loadingMssg">Data Loading</h1> <div className="dot-falling"></div></div> :
          filterCoins?.map((coins) => {
            return (
              <Coin
                key={coins.id}
                id={coins.id}
                icon={coins.image}
                coinName={coins.name}
                coinSymbol={coins.symbol}
                price={coins.current_price}
                marketCap={coins.market_cap}
                priceChange={coins.price_change_percentage_24h}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Home;

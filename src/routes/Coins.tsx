import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Contianer = styled.div`
  max-width: 480px;
  padding: 0px 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1``;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: block;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.div`
  text-align: center;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<CoinInterface[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://api.coinpaprika.com/v1/coins");
        const data = await response.json();
        setCoins(data.slice(0, 100));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <Contianer>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Contianer>
  );
}

export default Coins;
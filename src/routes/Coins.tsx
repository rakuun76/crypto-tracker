import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api";
import ToggleBtn from "../components/ToggleBtn";

const Container = styled.div`
  max-width: 480px;
  padding: 0px 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  input {
    position: absolute;
    right: 10px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 15px;
  margin-bottom: 10px;
  font-size: 18px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Loader = styled.div`
  text-align: center;
  font-size: 24px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isPending, data: coins } = useQuery<ICoin[]>({
    queryKey: ["coins"],
    queryFn: fetchCoins,
  });

  return (
    <Container>
      <Header>
        <Title>Crypto Tracker</Title>
        <ToggleBtn></ToggleBtn>
      </Header>
      {isPending ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/crypto-tracker/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={coin.symbol.toLowerCase()}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;

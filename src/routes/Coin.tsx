import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { styled } from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "@tanstack/react-query";
import { fetchCoin, fetchTicker } from "../api";
import { Helmet } from "react-helmet";

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

  a {
    position: absolute;
    left: 10px;
  }
`;

const Title = styled.h1``;

const Loader = styled.div`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: {
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
  }[];
  team: {
    id: string;
    name: string;
    position: string;
  }[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: {
    explorer: string[];
    facebook: string[];
    reddit: string[];
    source_code: string[];
    website: string[];
    youtube: string[];
  };
  links_extended: {
    url: string;
    type: string;
    stats?: {
      subscribers?: number;
      contributors?: number;
      stars?: number;
      followers?: number;
    };
  }[];
  whitepaper: {
    link: string;
    thumbnail: string;
  };
  first_data_at: string;
  last_data_at: string;
}

interface ITicker {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

interface ICoinProps {
  isDark: boolean;
}

function Coin({ isDark }: ICoinProps) {
  const { coinId } = useParams<{ coinId: string }>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isPending: isInfoPending, data: info } = useQuery<IInfo>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoin(coinId),
  });
  const { isPending: isTickerPending, data: ticker } = useQuery<ITicker>({
    queryKey: ["ticker", coinId],
    queryFn: () => fetchTicker(coinId),
  });

  const isPending = isInfoPending || isTickerPending;

  return (
    <Container>
      <Helmet>
        <title>{isPending ? "Loading..." : info?.name}</title>
      </Helmet>
      <Header>
        <Link to="/">&larr;</Link>
        <Title>{isPending ? "Loading..." : info?.name}</Title>
      </Header>
      {isPending ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{ticker?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{ticker?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={"/:coinId/price"}>
              <Price
                price={ticker?.quotes.USD.price}
                volume_24h={ticker?.quotes.USD.volume_24h}
                market_cap={ticker?.quotes.USD.market_cap}
                ath_price={ticker?.quotes.USD.ath_price}
                ath_date={ticker?.quotes.USD.ath_date}
                percent_from_price_ath={
                  ticker?.quotes.USD.percent_from_price_ath
                }
              />
            </Route>
            <Route path={"/:coinId/chart"}>
              <Chart coinId={coinId} isDark={isDark} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;

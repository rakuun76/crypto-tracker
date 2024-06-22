import { styled } from "styled-components";

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 20px;
  justify-items: center;
  align-items: center;
  background-color: ${(props) => props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const Metrics = styled.div`
  font-weight: 600;
  text-transform: uppercase;
`;

const Value = styled.div``;

interface IPrice {
  price?: number;
  volume_24h?: number;
  market_cap?: number;
  ath_price?: number;
  ath_date?: string;
  percent_from_price_ath?: number;
}

function Price({
  price,
  volume_24h,
  market_cap,
  ath_price,
  ath_date,
  percent_from_price_ath,
}: IPrice) {
  return (
    <Overview>
      <Metrics>price(USD)</Metrics>
      <Value>${price?.toFixed(3)}</Value>
      <Metrics>volume(24h)</Metrics>
      <Value>${volume_24h?.toFixed(3)}</Value>
      <Metrics>market cap</Metrics>
      <Value>${market_cap?.toFixed(3)}</Value>
      <Metrics>ath price</Metrics>
      <Value>${ath_price?.toFixed(3)}</Value>
      <Metrics>ath date</Metrics>
      <Value>{ath_date?.slice(0, 10)}</Value>
      <Metrics>percent from ath</Metrics>
      <Value>{percent_from_price_ath}%</Value>
    </Overview>
  );
}

export default Price;

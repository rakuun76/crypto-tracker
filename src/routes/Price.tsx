import { styled } from "styled-components";

interface IPrice {
  price?: number;
  volume_24h?: number;
  market_cap?: number;
  ath_price?: number;
  ath_date?: string;
  percent_from_price_ath?: number;
}

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 20px;
  justify-items: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;

  span:nth-child(odd) {
    font-weight: 600;
    text-transform: uppercase;
  }
`;

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
      <span>price(USD)</span>
      <span>${price?.toFixed(3)}</span>
      <span>volume(24h)</span>
      <span>${volume_24h?.toFixed(3)}</span>
      <span>market cap</span>
      <span>${market_cap?.toFixed(3)}</span>
      <span>ath price</span>
      <span>${ath_price?.toFixed(3)}</span>
      <span>ath date</span>
      <span>{ath_date?.slice(0, 10)}</span>
      <span>percent from ath</span>
      <span>{percent_from_price_ath}%</span>
    </Overview>
  );
}

export default Price;

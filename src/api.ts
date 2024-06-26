const COINPAPRIKA_BASE_URL = "https://api.coinpaprika.com/v1";
const NOMADCODERS_BASE_URL = "https://ohlcv-api.nomadcoders.workers.dev";

export function fetchCoins() {
  return fetch(`${COINPAPRIKA_BASE_URL}/coins`).then((response) =>
    response.json()
  );
}

export function fetchCoin(coinId: string) {
  return fetch(`${COINPAPRIKA_BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchTicker(coinId: string) {
  return fetch(`${COINPAPRIKA_BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchOhlcvHistory(coinId: string) {
  return fetch(`${NOMADCODERS_BASE_URL}/?coinId=${coinId}`).then((response) =>
    response.json()
  );
}

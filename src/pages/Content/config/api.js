export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=200&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) => {
  // console.log(
  //   `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
  // );
  return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
};

// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1392577232&to=1422577232

// export const HistoricalRangeChart = (id, currency, start, end) => {
//   end = typeof end !== 'undefined' ? end : Date().now;
//   console.log('🚀 ~ file: api.js ~ line 13 ~ HistoricalRangeChart ~ end', end);
//   console.log(
//     '🚀 ~ file: api.js ~ line 13 ~ HistoricalRangeChart ~ start',
//     start
//   );
//   console.log(
//     '🚀 ~ file: api.js ~ line 13 ~ HistoricalRangeChart ~ currency',
//     currency
//   );
//   console.log('🚀 ~ file: api.js ~ line 13 ~ HistoricalRangeChart ~ id', id);
//   return `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=${currency}&from=${start}&to=${end}`;
// };
export const HistoricalRangeChart = (id, currency, start, end) => {
  // return `https://data.messari.io/api/v1/assets/${id}/metrics/price/time-series?start=${start}&end=${end}&interval=1d&timestamp-format=rfc3339`;

  return `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${start}&to=${end}`;
};
// https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=1653537288&to=1653570727

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

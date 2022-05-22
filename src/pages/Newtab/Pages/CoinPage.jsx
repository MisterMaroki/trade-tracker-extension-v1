import CustomizedSnackbars from '../Components/SuccessSnackbar';
import { CircularProgress, Input, Typography } from '@mui/material';
import React from 'react';
import { numberWithCommas } from '../Components/banner/Carousel';
import CoinChart from '../Components/CoinChart';
import { CryptoState } from '../CryptoContext';
import { CoinContainer, Sidebar, tertiaryalt } from '../styles/themeVariables';
const parse = require('html-react-parser');

const CoinPage = () => {
  const {
    currency,
    symbol,
    coin,
    tradeNow,
    quantity,
    setQuantity,
    setShowTrades,
  } = CryptoState();
  console.log('🚀 ~ file: CoinPage.jsx ~ line 20 ~ CoinPage ~ coin', coin);

  return (
    <>
      <CoinContainer>
        {!coin ? (
          <CircularProgress sx={{ color: tertiaryalt }} />
        ) : (
          <>
            <Sidebar>
              <img
                src={coin?.image?.large}
                alt={coin?.name}
                height="120"
                style={{ marginBottom: 20 }}
              />

              <Typography
                variant="h4"
                className="heading"
                style={{ fontWeight: 'bold' }}
              >
                {coin?.name}
              </Typography>
              <Typography>
                {parse(`${coin?.description.en.split('. ')[0]}`)}.
              </Typography>
              <div className="market-data">
                <span
                  style={{
                    display: 'flex',
                  }}
                >
                  <Typography variant="h6" style={{ fontWeight: '600' }}>
                    Rank:{' '}
                  </Typography>
                  &nbsp;&nbsp;
                  <Typography variant="h6">{coin?.market_cap_rank} </Typography>
                </span>
                <span
                  style={{
                    display: 'flex',
                  }}
                >
                  <Typography variant="h6" style={{ fontWeight: '600' }}>
                    Current Price:{' '}
                  </Typography>
                  &nbsp;&nbsp;
                  <Typography variant="h6">
                    {coin && symbol}
                    {coin &&
                      numberWithCommas(
                        coin?.market_data.current_price[currency?.toLowerCase()]
                      )}{' '}
                  </Typography>
                </span>
                <span
                  style={{
                    display: 'flex',
                  }}
                >
                  <Typography variant="h6" style={{ fontWeight: '600' }}>
                    Market Cap:{' '}
                  </Typography>
                  &nbsp;&nbsp;
                  <Typography variant="h6">
                    {coin && symbol}
                    {coin &&
                      numberWithCommas(
                        coin?.market_data.market_cap[currency?.toLowerCase()]
                          .toString()
                          .slice(0, -6)
                      )}
                    M
                  </Typography>
                </span>
              </div>
              <div className="flex">
                <CustomizedSnackbars
                  direction="buy"
                  func={tradeNow}
                  quantity={quantity}
                  ticker={coin?.symbol}
                />
                <Input
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                ></Input>
                <CustomizedSnackbars
                  direction="sell"
                  func={tradeNow}
                  quantity={quantity}
                  ticker={coin?.symbol}
                />
              </div>
              <div className="flex">
                <button onClick={() => setShowTrades(true)}>View Trades</button>
              </div>
            </Sidebar>

            <CoinChart coin={coin} />
          </>
        )}
      </CoinContainer>
    </>
  );
};

export default CoinPage;

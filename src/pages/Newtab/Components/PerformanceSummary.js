import { Box } from '@mui/material';
import React from 'react';
import { ChartState } from '../ChartContext';
import { CryptoState } from '../CryptoContext';

import { GridItem, primarytext } from '../styles/themeVariables';
import { numberWithCommas } from './banner/Carousel';

const PerformanceSummary = () => {
  const { trades, currency } = CryptoState();
  const {
    allClosedTrades,
    averagePercentGain,
    averageInvestment,
    totalClosedPositions,
    allLongs,
    allShorts,

    totalReturns,
    totalInvested,
    netProfit,
  } = ChartState();

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(16, 1fr)"
      gridTemplateRows="repeat(16,1fr)"
      height={'95%'}
      width={'95%'}
      gap={'20px'}
      rowGap={'20px'}
      margin={'auto'}
    >
      <Box gridColumn="1/-1 " gridRow="2/5">
        <div className="container col darkbgonly start">
          <h6 style={{ margin: '0 auto' }}>Performance Summary</h6>
        </div>
      </Box>

      <Box gridColumn="1/9" gridRow="5/8">
        <div className="container col darkbgonly start">
          <h6
            style={{
              fontSize: 18,
              textTransform: 'uppercase',
              color: primarytext,
              margin: '0 auto',
            }}
          >
            Long PnL:
          </h6>
          <span
            className={netProfit(allLongs) >= 0 ? 'green' : 'red'}
            style={{ fontSize: 15, margin: '0 auto' }}
          >
            {netProfit(allLongs) >= 0 && '+'}
            {numberWithCommas(netProfit(allLongs).toFixed(2))} {currency}
          </span>
        </div>
      </Box>

      <Box gridColumn="1/9" gridRow="8/11">
        {' '}
        <div className="container col darkbgonly start">
          <h6
            style={{
              fontSize: 18,
              textTransform: 'uppercase',
              color: primarytext,
              margin: '0 auto',
            }}
          >
            Avg. Long:
          </h6>
          <span
            className={averagePercentGain(allLongs) >= 0 ? 'green' : 'red'}
            style={{ fontSize: 15, margin: '0 auto' }}
          >
            {averagePercentGain(allLongs) >= 0 && '+'}
            {averagePercentGain(allLongs).toFixed(2)}%
          </span>
        </div>
      </Box>
      <Box gridColumn="9/-1" gridRow="5/8">
        <div className="container col darkbgonly start">
          <h6
            style={{
              fontSize: 18,
              textTransform: 'uppercase',
              color: primarytext,
              margin: '0 auto',
            }}
          >
            Short PnL:
          </h6>
          <span
            className={netProfit(allShorts) >= 0 ? 'green' : 'red'}
            style={{ fontSize: 15, margin: '0 auto' }}
          >
            {netProfit(allShorts) >= 0 && '+'}
            {numberWithCommas(netProfit(allShorts).toFixed(2))} {currency}
          </span>
        </div>
      </Box>
      <Box gridColumn="9/-1" gridRow="8/11">
        <div className="container col darkbgonly start">
          <h6
            style={{
              fontSize: 18,
              textTransform: 'uppercase',
              color: primarytext,
              margin: '0 auto',
            }}
          >
            Avg. Short:
          </h6>
          <span
            className={averagePercentGain(allShorts) >= 0 ? 'green' : 'red'}
            style={{ fontSize: 15, margin: '0 auto' }}
          >
            {averagePercentGain(allShorts) >= 0 && '+'}
            {averagePercentGain(allShorts).toFixed(2)}%
          </span>
        </div>
      </Box>
      <Box gridColumn="1/9" gridRow="11/14">
        <div className="container col darkbgonly start">
          <h6
            style={{
              fontSize: 18,
              textTransform: 'uppercase',
              color: primarytext,
              margin: '0 auto',
            }}
          >
            Invested:
          </h6>
          <span className={'green'} style={{ fontSize: 15, margin: '0 auto' }}>
            {numberWithCommas(totalInvested(allClosedTrades).toFixed(2))}{' '}
            {currency}
          </span>
        </div>
      </Box>
      <Box gridColumn="9/-1" gridRow="11/14">
        <div className="container col darkbgonly start">
          <h6
            style={{
              fontSize: 18,
              textTransform: 'uppercase',
              color: primarytext,
              margin: '0 auto',
            }}
          >
            Overall PnL:
          </h6>
          <span
            className={
              totalReturns(allClosedTrades) - totalInvested(allClosedTrades) >=
              0
                ? 'green'
                : 'red'
            }
            style={{ fontSize: 15, margin: '0 auto' }}
          >
            {netProfit(allClosedTrades) >= 0 && '+'}
            {numberWithCommas(
              (
                totalReturns(allClosedTrades) - totalInvested(allClosedTrades)
              ).toFixed(2)
            )}{' '}
            {currency}
          </span>
        </div>
      </Box>
      {/* <Box gridColumn="1/-1 " gridRow="11/16">
        <div className="container col darkbgonly">
          <h6
            style={{
              fontSize: 22,
              textTransform: 'uppercase',
              color: primarytext,
              margin: '0 auto',
            }}
          >
            Overall PnL:
          </h6>

          <span
            className={
              averagePercentGain(allClosedTrades) >= 0 ? 'green' : 'red'
            }
            style={{ fontSize: 18, margin: '0 auto' }}
          >
            {averagePercentGain(allClosedTrades) >= 0 && '+'}
            {numberWithCommas(
              averagePercentGain(allClosedTrades).toFixed(2)
            )}{' '}
            {currency}
          </span>
        </div>
      </Box> */}
    </Box>
  );
};

export default PerformanceSummary;

import { Box, Typography } from '@mui/material';
import React from 'react';
import award from '../../../../assets/img';
import { CryptoState } from '../../CryptoContext';
import { LeaderboardState } from '../../LeaderboardContext';
import {
  LeaderboardContainer,
  typographySx,
} from '../../styles/themeVariables';
import { UserState } from '../../UserContext';
import { numberWithCommas } from '../banner/Carousel';

const LeaderBoardCard = () => {
  const { user } = UserState();
  const { stats } = LeaderboardState();
  const { currency } = CryptoState();
  const userStats = stats?.find((obj) => obj.id === user?.uid);
  const userRank = stats?.findIndex((obj) => obj.id === user?.uid) + 1;
  const userRankByAvg =
    stats
      .sort((a, b) => b.stats.avg - a.stats.avg)
      .findIndex((obj) => obj.id === user?.uid) + 1;
  const userRankByBest =
    stats
      .sort((a, b) => b.stats.best - a.stats.best)
      .findIndex((obj) => obj.id === user?.uid) + 1;
  return (
    <LeaderboardContainer>
      <Typography variant="h6" style={{ ...typographySx, margin: 5 }}>
        Rankings
      </Typography>
      <Box display="flex" gap="1rem">
        <div className="image-container">
          <img src={award} alt="award" />
          <p>{ordinal(userRank)}</p>
        </div>
        <div className="leaderboard-contents">
          <p>
            Total Pnl:{' '}
            <span>
              {numberWithCommas(userStats?.stats.profit)} {currency}
            </span>{' '}
            - {ordinal(userRank)}
          </p>
          <p>
            Avg. % Gain: <span>{userStats?.stats?.avg.toFixed(2)}%</span> -{' '}
            {ordinal(userRankByAvg)}
          </p>
          <p>
            Best trade:{' '}
            <span>
              {numberWithCommas(userStats?.stats?.best)} {currency}
            </span>{' '}
            - {ordinal(userRankByBest)}
          </p>
          <p>
            Total Users: <span>{stats.length}</span>
          </p>
        </div>
      </Box>
    </LeaderboardContainer>
  );
};

export default LeaderBoardCard;

function ordinal(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
}

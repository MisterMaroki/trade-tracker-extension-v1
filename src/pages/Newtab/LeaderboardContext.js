import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { createContext, useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { CryptoState } from './CryptoContext';
import { db } from './firebase';
import { UserState } from './UserContext';

const Leaderboard = createContext();
const LeaderboardContext = ({ children }) => {
  // const [leaderBoard,setLeaderboard] =
  const { trades } = CryptoState();
  const { user, setAlert } = UserState();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const getAllUsersStats = async () => {
      const statsCol = collection(db, 'leaderboard');
      const statsSnapshot = await getDocs(statsCol);
      const statsList = statsSnapshot.docs.map((doc) => {
        return { id: doc.id, stats: doc.data() };
      });
      setStats(statsList.sort((a, b) => b.stats.avg - a.stats.avg));
    };
    return () => {
      getAllUsersStats();
    };
  }, [user]);

  const closedTrades = useMemo(
    () => trades?.filter((x) => !x.active),
    [trades]
  );

  const totalProfit = +closedTrades.reduce((acc, cur) => {
    return parseFloat(
      parseFloat(acc) + parseFloat(cur.value - cur.invested)
    ).toFixed(2);
  }, 0);

  const avgPercentGain = +closedTrades.reduce((acc, cur) => {
    return parseFloat(
      acc + parseFloat(100 * ((cur.value - cur.invested) / cur.invested))
    ).toFixed(5);
  }, 0);

  let bestResult = closedTrades?.sort(
    (a, b) => b.value - b.invested - (a.value - a.invested)
  )[0];
  bestResult = bestResult?.value - bestResult?.invested;
  console.log(
    '🚀 ~ file: LeaderboardContext.js ~ line 49 ~ LeaderboardContext ~ bestResult',
    bestResult
  );

  useEffect(() => {
    if (user?.uid && trades.length >= 1) {
      const writeLeaderBoard = async () => {
        const leaderboardRef = doc(db, 'leaderboard', user.uid);

        try {
          console.log('writeLeaderboard() try');

          await setDoc(
            leaderboardRef,
            {
              profit: +totalProfit,
              avg: +avgPercentGain,
              best: +bestResult,
            },
            { merge: false }
          );
        } catch (error) {
          setTimeout(
            () =>
              setAlert({
                open: true,
                message: error.message,
                type: 'error',
              }),
            500
          );
        }
      };
      writeLeaderBoard();
    }
  }, [closedTrades?.length]);

  return (
    <Leaderboard.Provider value={{ stats, setStats }}>
      {children}
    </Leaderboard.Provider>
  );
};
export const LeaderboardState = () => useContext(Leaderboard);

export default LeaderboardContext;

export function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

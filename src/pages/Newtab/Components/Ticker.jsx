import id from 'faker/lib/locales/id_ID';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './banner/Carousel';

export default function Ticker({ row }) {
  const { id, coin } = CryptoState();
  const { symbol } = coin;
  const [prefix, setPrefix] = useState(symbol || null);
  const socketUrl = 'wss://stream.binance.com:9443/stream';

  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(socketUrl);

  const messageHistory = useRef([]);

  const handleClickSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: 'SUBSCRIBE',
        params: [`${symbol}usdt@ticker`],
        id: 1,
      }),
    [sendJsonMessage]
  );

  const handleClickUnSendMessage = useCallback(
    (symbol) =>
      sendJsonMessage({
        method: 'UNSUBSCRIBE',
        params: [`${symbol}usdt@ticker`],
        id: 1,
      }),
    [sendJsonMessage]
  );
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  messageHistory.current = useMemo(
    () =>
      [
        isNaN(parseInt(lastJsonMessage?.data?.c)?.toFixed(2))
          ? row?.current_price?.toFixed(2)
          : parseInt(lastJsonMessage?.data?.c)?.toFixed(2),
      ] ?? [],
    [lastJsonMessage]
  );
  useEffect(() => {
    console.log(connectionStatus);
    handleClickSendMessage();

    // returned function will be called on component unmount
  }, [
    prefix,
    symbol,
    lastJsonMessage,
    handleClickSendMessage,
    handleClickUnSendMessage,
    connectionStatus,
  ]);

  useEffect(() => {
    lastJsonMessage?.data?.s?.toLowerCase() != `${symbol}usdt` &&
      handleClickUnSendMessage(prefix);
    setPrefix(symbol);

    console.log(
      '🚀 ~ file: Ticker.jsx ~ line 13 ~ Ticker ~ lastJsonMessage',
      lastJsonMessage
    );
  }, [lastJsonMessage]);

  return row?.symbol === symbol && messageHistory?.current[0];
}

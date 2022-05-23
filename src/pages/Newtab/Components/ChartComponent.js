import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { ChartState } from '../ChartContext';

export const ChartComponent = () => {
  const {
    days,
    setDays,
    historicalData,
    setHistoricalData,
    fetchHistoricalData,
    loading,
    setLoading,
  } = ChartState();
  const data = historicalData?.map((price) => {
    let date = new Date(price[0]);

    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;

    return {
      time: date.toISOString().slice(0, 10),
      value: price[1],
    };
  });

  // string=22/05/2022, expected format=yyyy-mm-dd

  console.log('🚀 ~ file: ChartComponent.js ~ line 28 ~ data ~ data', data);

  // data={{
  //   labels: historicalData.map((coin) => {
  //     let date = new Date(coin[0]);

  //     let time =
  //       date.getHours() > 12
  //         ? `${date.getHours() - 12}:${date.getMinutes()} PM`
  //         : `${date.getHours()}:${date.getMinutes()} AM`;

  //     return days === 1 ? time : date.toLocaleDateString();
  //   }),

  //   datasets: [
  //     {
  //       data: historicalData.map((coin) => coin[1]),
  //       label: `Price (Past ${days} days) in ${currency}`,
  //       borderColor: 'rgb(255, 99, 132)',
  //     },
  //   ],
  // }}

  const colors = {
    backgroundColor: 'white',
    lineColor: '#2962FF',
    textColor: 'black',
    areaTopColor: '#2962FF',
    areaBottomColor: 'rgba(41, 98, 255, 0.28)',
  };
  const {
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  } = colors;
  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

export const initialData = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
];

// export function App(props) {
//   return <ChartComponent {...props} data={initialData}></ChartComponent>;
// }

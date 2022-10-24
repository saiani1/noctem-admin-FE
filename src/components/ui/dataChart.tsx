/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import {
  VictoryTheme,
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
} from 'victory';

import styles from '../../../styles/ui/dataChart.module.scss';
import { IDetailSalesData } from '../../types/data.d';

interface IProps {
  beforeSalesData: IDetailSalesData[] | undefined;
  recentSalesData: IDetailSalesData[] | undefined;
}

interface IData {
  x: string;
  y: number;
}

function defaultAddrSort(a: any, b: any) {
  if (a.index > b.index) {
    return -1;
  }
  return 0;
}

function dataChart({ beforeSalesData, recentSalesData }: IProps) {
  const [status, setStatus] = useState('hour');
  const [sortingBeforeData, setSortingBeforeData] = useState<
    IData[] | undefined
  >([]);
  const [sortingRecentData, setSortingRecentData] = useState<
    IData[] | undefined
  >([]);
  const cx = classNames.bind(styles);

  useEffect(() => {
    if (beforeSalesData && recentSalesData) {
      const sortLists1 = beforeSalesData.sort(defaultAddrSort);
      const sortLists2 = recentSalesData.sort(defaultAddrSort);
      const result1: IData[] = [];
      sortLists1.forEach(data => {
        result1.push({ x: data.stringHour, y: data.sales });
      });
      const result2: IData[] = [];
      sortLists2.forEach(data => {
        result2.push({ x: data.stringHour, y: data.sales });
      });
      setSortingBeforeData(result1);
      setSortingRecentData(result2);
    }
  }, [recentSalesData]);

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={1000}
      height={400}
      domainPadding={20}
    >
      <VictoryLabel x={890} y={20} text='단위: 천원' />
      <VictoryAxis tickValues={[0, 0.25, 0.5, 0.75, 1]} />
      <VictoryAxis dependentAxis tickFormat={x => `${x / 1000},`} />
      <VictoryLine
        data={sortingBeforeData}
        x='x'
        y='y'
        style={{
          data: { stroke: 'yellowGreen' },
        }}
      />
      <VictoryLine
        data={sortingRecentData}
        x='x'
        y='y'
        style={{
          data: { stroke: 'skyblue' },
        }}
      />
    </VictoryChart>
  );
}

export default dataChart;

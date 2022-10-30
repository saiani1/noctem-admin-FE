/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import {
  VictoryTheme,
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory';

import { IDetailSalesData } from '../../types/data.d';

interface IProps {
  beforeSalesData: IDetailSalesData[] | undefined;
  recentSalesData: IDetailSalesData[] | undefined;
}

function dataChart({ beforeSalesData, recentSalesData }: IProps) {
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    setIsFetching(false);
    if (beforeSalesData && recentSalesData) {
      setIsFetching(true);
    }
  }, [beforeSalesData, recentSalesData]);

  return (
    <>
      {isFetching && (
        <VictoryChart
          theme={VictoryTheme.material}
          width={1050}
          height={350}
          domainPadding={20}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension='x'
              labels={({ datum }) => `${datum.y.toLocaleString()}원`}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={3}
                  flyoutWidth={120}
                  flyoutHeight={40}
                  flyoutStyle={{ fill: '#aaa', stroke: 'none' }}
                  labelComponent={<VictoryLabel lineHeight={1.4} />}
                />
              }
            />
          }
        >
          <VictoryAxis
            tickValues={[0, 0.25, 0.5, 0.75, 1]}
            style={{
              tickLabels: {
                fontSize: '13px',
                fill: '#aaa',
                fontWeight: 'bold',
              },
              axis: { stroke: '#eee', strokeWidth: '1' },
              grid: { stroke: 'none' },
              ticks: { stroke: 'none' },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickLabelComponent={
              <VictoryLabel textAnchor='start' dx={15} dy={10} />
            }
            tickFormat={x => `${(x / 1000).toLocaleString()},`}
            offsetY={50}
            style={{
              tickLabels: {
                fontSize: '13px',
                fill: '#aaa',
                fontWeight: 'bold',
              },
              axis: { stroke: 'none' },
              grid: { stroke: '#eee', strokeDasharray: 'none' },
              ticks: { stroke: 'none' },
            }}
          />
          <VictoryLine
            data={beforeSalesData}
            style={{
              labels: { fill: '#ddd' },
              data: { stroke: 'greenYellow' },
            }}
          />
          <VictoryLine
            data={recentSalesData}
            style={{
              labels: { fill: '#fff' },
              data: { stroke: 'skyblue' },
            }}
          />
        </VictoryChart>
      )}
    </>
  );
}

export default dataChart;

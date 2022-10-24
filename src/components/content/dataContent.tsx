/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/dataContent.module.scss';
import {
  ISalesData,
  IDetailSalesData,
  IMenuList,
  ICustomerInfo,
} from '../../types/data.d';
import {
  getPopularMenuList,
  getCustomerRank,
  getHourSalesData,
} from '../../../pages/api/data';
import DrinkRankItem from '../ui/drinkRankItem';
import DataChart from '../ui/dataChart';

function dataContent() {
  const [chartTab, setChartTab] = useState('time');
  const [menuList, setMenuList] = useState<IMenuList[]>([]);
  const [customerInfo, setCustomerInfo] = useState<ICustomerInfo[]>([]);
  const [salesData, setSalesData] = useState<ISalesData>();
  const [beforeSalesData, setBeforeSalesData] = useState<IDetailSalesData[]>();
  const [recentSalesData, setRecentSalesData] = useState<IDetailSalesData[]>();
  const cx = classNames.bind(styles);

  useEffect(() => {
    Promise.all([
      getPopularMenuList(),
      getCustomerRank(),
      getHourSalesData(),
    ]).then(res => {
      console.log('음료랭킹, 고객랭킹, 세일즈데이터:', res);
      setMenuList(res[0].data.data);
      setCustomerInfo(res[1].data.data);
      setSalesData(res[2].data.data);
      setBeforeSalesData(res[2].data.data.beforeStatistics);
      setRecentSalesData(res[2].data.data.recentStatistics);
    });
  }, []);

  const handleClickChartTab = (e: React.MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLInputElement;
    setChartTab(name);
  };

  return (
    <div className={cx('wrap')}>
      <h1>데이터 관리</h1>
      <div className={cx('sales-status-wrap')}>
        <div className={cx('tit-wrap')}>
          <h2>매출현황</h2>
          <ul className={cx('tab-wrap')}>
            <li
              className={cx('tab', 'time', chartTab === 'time' ? 'active' : '')}
            >
              <button type='button' name='time' onClick={handleClickChartTab}>
                시간별
              </button>
            </li>
            <li
              className={cx('tab', 'day', chartTab === 'day' ? 'active' : '')}
            >
              <button type='button' name='day' onClick={handleClickChartTab}>
                일별
              </button>
            </li>
            <li
              className={cx(
                'tab',
                'month',
                chartTab === 'month' ? 'active' : '',
              )}
            >
              <button type='button' name='month' onClick={handleClickChartTab}>
                월별
              </button>
            </li>
            <li className={cx('bar')} />
          </ul>
        </div>
        <div className={cx('sales-chart-wrap')}>
          <ul className={cx('card-wrap')}>
            <li>
              <h3>매출</h3>
              <div className={cx('cnt')}>
                <strong>{salesData?.totalSales.toLocaleString()}원</strong>
                <span className={cx('change')}>
                  <span
                    className={cx(
                      'arrow',
                      salesData && salesData?.performanceSales < 0 ? 'up' : '',
                    )}
                  >
                    {salesData && salesData?.performanceSales < 0 ? '▼ ' : '▲ '}
                  </span>
                  {salesData && salesData?.performanceSales < 0
                    ? (salesData?.performanceSales * -1).toLocaleString()
                    : salesData?.performanceSales.toLocaleString()}
                  원
                </span>
              </div>
            </li>
            <li>
              <h3>주문수</h3>
              <div className={cx('cnt')}>
                <strong>{salesData?.totalCount}건</strong>
                <span className={cx('change')}>
                  <span
                    className={cx(
                      'arrow',
                      salesData && salesData?.performanceCount < 0 ? 'up' : '',
                    )}
                  >
                    {salesData && salesData?.performanceCount < 0 ? '▼ ' : '▲ '}
                  </span>
                  {salesData && salesData?.performanceCount < 0
                    ? (salesData?.performanceCount * -1).toLocaleString()
                    : salesData?.performanceCount.toLocaleString()}
                  건
                </span>
              </div>
            </li>
          </ul>
          <div className={cx('chart-wrap')}>
            <DataChart
              beforeSalesData={beforeSalesData}
              recentSalesData={recentSalesData}
            />
          </div>
        </div>
      </div>
      <div className={cx('bottom-status-wrap')}>
        <div className={cx('popular-menu-wrap')}>
          <h2>인기메뉴 순위</h2>
          <ul className={cx('menu-wrap')}>
            {menuList &&
              menuList.map((menu: IMenuList) => (
                <DrinkRankItem key={menu.index} menu={menu} />
              ))}
          </ul>
        </div>
        <div className={cx('customer-status-wrap')}>
          <h2>성별, 연령별 방문자 현황</h2>
          <ul className={cx('rank-wrap')}>
            {customerInfo.map((rank: ICustomerInfo) => (
              <li key={rank.index}>
                <Image
                  src={`/assets/svg/icon-${rank.rank}.svg`}
                  width={21}
                  height={28}
                />
                <span>
                  {rank.age} {rank.sex}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default dataContent;

/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import { useRecoilValue } from 'recoil';
import styles from '../../../styles/content/dataContent.module.scss';
import {
  ISalesData,
  IDetailSalesData,
  IMenuList,
  ICustomerInfo,
  IUserRankInfo,
} from '../../types/data.d';
import {
  getPopularMenuList,
  getCustomerRank,
  getHourSalesData,
  getDaySalesData,
  getMonthSalesData,
  getUserRank,
} from '../../store/api/data';
import DrinkRankItem from '../ui/drinkRankItem';
import DataChart from '../ui/dataChart';
import { tokenState } from '../../store/atom/auth';

function dataContent() {
  const token = useRecoilValue(tokenState);
  const [chartTab, setChartTab] = useState('hour');
  const [menuList, setMenuList] = useState<IMenuList[]>([]);
  const [customerInfo, setCustomerInfo] = useState<ICustomerInfo[]>([]);
  const [userRankInfo, setUserRankInfo] = useState<IUserRankInfo[]>([]);
  const [salesData, setSalesData] = useState<ISalesData>();
  const [beforeSalesData, setBeforeSalesData] = useState<IDetailSalesData[]>();
  const [recentSalesData, setRecentSalesData] = useState<IDetailSalesData[]>();
  const cx = classNames.bind(styles);

  useEffect(() => {
    Promise.all([
      getPopularMenuList(),
      getCustomerRank(token),
      getHourSalesData(token),
      getUserRank(),
    ]).then(res => {
      setMenuList(res[0].data.data);
      setCustomerInfo(res[1].data.data);
      setSalesData(res[2].data.data);
      setBeforeSalesData(res[2].data.data.beforeStatistics);
      setRecentSalesData(res[2].data.data.recentStatistics);
      setUserRankInfo(res[3].data.data.slice(0, 3));
    });
  }, []);

  const handleClickChartTab = (e: React.MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLInputElement;
    setChartTab(name);
    if (name === 'hour') {
      getHourSalesData(token).then(res => {
        setSalesData(res.data.data);
        setBeforeSalesData(res.data.data.beforeStatistics);
        setRecentSalesData(res.data.data.recentStatistics);
      });
    } else if (name === 'day') {
      getDaySalesData(token).then(res => {
        setSalesData(res.data.data);
        setBeforeSalesData(res.data.data.beforeStatistics);
        setRecentSalesData(res.data.data.recentStatistics);
      });
    } else if (name === 'month') {
      getMonthSalesData(token).then(res => {
        setSalesData(res.data.data);
        setBeforeSalesData(res.data.data.beforeStatistics);
        setRecentSalesData(res.data.data.recentStatistics);
      });
    }
  };

  return (
    <div className={cx('wrap', 'dataContent-wrap')}>
      <h1>데이터 관리</h1>
      <div className={cx('sales-status-wrap')}>
        <div className={cx('tit-wrap')}>
          <h2>매출현황</h2>
          <ul className={cx('tab-wrap')}>
            <li
              className={cx('tab', 'hour', chartTab === 'hour' ? 'active' : '')}
            >
              <button type='button' name='hour' onClick={handleClickChartTab}>
                시간별
              </button>
            </li>
            <li
              className={cx('tab', 'day', chartTab === 'day' ? 'active' : '')}
            >
              <button type='button' name='day' onClick={handleClickChartTab}>
                요일별
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
          <div className={cx('desc')}>
            {chartTab === 'hour' && '전일'}
            {chartTab === 'day' && '전주'}
            {chartTab === 'month' && '전월'} 대비
          </div>
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
                <strong>{salesData?.totalCount.toLocaleString()}건</strong>
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
            <span className={cx('unit')}>
              단위: <strong>천 원</strong>
            </span>
            <div className={cx('chart-height')}>
              <DataChart
                beforeSalesData={beforeSalesData}
                recentSalesData={recentSalesData}
              />
            </div>
            <ul className={cx('index')}>
              <li className={cx('before')}>
                {chartTab === 'hour' && '전일'}
                {chartTab === 'day' && '전주'}
                {chartTab === 'month' && '전월'}
              </li>
              <li className={cx('now')}>
                {chartTab === 'hour' && '금일'}
                {chartTab === 'day' && '금주'}
                {chartTab === 'month' && '금월'}
              </li>
            </ul>
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
            <li className={cx('bar')} />
          </ul>
        </div>
        <div className={cx('customer-status-wrap')}>
          <h2>성별/연령별 방문자 현황</h2>
          <ul className={cx('rank-wrap')}>
            {customerInfo.map((rank: ICustomerInfo) => (
              <li
                key={rank.index}
                className={cx(rank.rank === 1 ? 'active' : '')}
              >
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
            <li className={cx('bar')} />
          </ul>
        </div>
        <div className={cx('nickname-rank-wrap')}>
          <h2>최다 방문자 현황</h2>
          <ul className={cx('nickname-wrap')}>
            {userRankInfo.map((user: IUserRankInfo) => (
              <li
                key={`nickname-${user.index}`}
                className={cx(user.rank === 1 ? 'active' : '')}
              >
                <Image
                  src={`/assets/svg/icon-${user.rank}.svg`}
                  width={21}
                  height={28}
                />
                <span>{user.nickname}</span>
              </li>
            ))}
            <li className={cx('bar')} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default dataContent;

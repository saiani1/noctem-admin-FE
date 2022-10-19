import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/dataContent.module.scss';
import { IMenuList, IMenuInfo, ICustomerInfo } from '../../types/data.d';
import {
  getPopularMenuList,
  getMenuInfo,
  getCustomerRank,
} from '../../../pages/api/data';

function dataContent() {
  const [chartTab, setChartTab] = useState('time');
  const [isFetching, setIsFetching] = useState(false);
  const [menuList, setMenuList] = useState<IMenuList[]>([]);
  const [menuInfo, setMenuInfo] = useState<IMenuInfo[]>([]);
  const [customerInfo, setCustomerInfo] = useState<ICustomerInfo[]>([]);
  const cx = classNames.bind(styles);

  useEffect(() => {
    Promise.all([getPopularMenuList(), getCustomerRank()]).then(res => {
      console.log(res);
      // setMenuList(res[0].data.data);
      setCustomerInfo(res[1].data.data);
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
              className={cx('tab', 'week', chartTab === 'week' ? 'active' : '')}
            >
              <button type='button' name='week' onClick={handleClickChartTab}>
                주별
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
                <strong>10,000,000원</strong>
                <span className={cx('change')}>
                  <span className={cx('arrow')}>▼ </span>10,000원
                </span>
              </div>
            </li>
            <li>
              <h3>주문수</h3>
              <div className={cx('cnt')}>
                <strong>104건</strong>
                <span className={cx('change')}>
                  <span className={cx('arrow', 'up')}>▲ </span>3건
                </span>
              </div>
            </li>
          </ul>
          <div className={cx('chart-wrap')}>
            <ul className={cx('index')}>
              <li className={cx('before')}>전일</li>
              <li className={cx('now')}>금일</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cx('bottom-status-wrap')}>
        <div className={cx('popular-menu-wrap')}>
          <h2>인기메뉴 순위</h2>
          <ul className={cx('menu-wrap')}>
            <li className={cx('first')}>
              <div className={cx('tit-wrap')}>
                <Image src='/assets/svg/icon-1st.svg' width={21} height={28} />
                <span className={cx('menu-name')}>민트초코 프라푸치노</span>
              </div>
              <span className={cx('img-wrap')}>
                <img src='/assets/images/jpg/menu.jpg' alt='민트초코' />
              </span>
            </li>
          </ul>
        </div>
        <div className={cx('customer-status-wrap')}>
          <h2>성별, 연령별 방문자 현황</h2>
          <ul className={cx('rank-wrap')}>
            {customerInfo.map((rank: ICustomerInfo) => (
              <li key={rank.index}>
                <Image src='/assets/svg/icon-1st.svg' width={21} height={28} />
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

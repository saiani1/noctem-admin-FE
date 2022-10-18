import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/dataContent.module.scss';

function dataContent() {
  const [chartTab, setChartTab] = useState('time');
  const cx = classNames.bind(styles);

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
            <li className={cx('first', 'active')}>
              <div className={cx('tit-wrap')}>
                <Image src='/assets/svg/icon-1st.svg' width={21} height={28} />
                <span className={cx('menu-name')}>민트초코 프라푸치노</span>
              </div>
              <span className={cx('img-wrap')}>
                <img src='/assets/images/jpg/menu.jpg' alt='민트초코' />
              </span>
            </li>
            <li className={cx('second')}>
              <div className={cx('tit-wrap')}>
                <Image src='/assets/svg/icon-2nd.svg' width={21} height={28} />
                <span className={cx('menu-name')}>민트초코 프라푸치노</span>
              </div>
              <span className={cx('img-wrap')}>
                <img src='/assets/images/jpg/menu.jpg' alt='민트초코' />
              </span>
            </li>
            <li className={cx('third')}>
              <div className={cx('tit-wrap')}>
                <Image src='/assets/svg/icon-3rd.svg' width={21} height={28} />
                <span className={cx('menu-name')}>민트초코 프라푸치노</span>
              </div>
              <span className={cx('img-wrap')}>
                <img src='/assets/images/jpg/menu.jpg' alt='민트초코' />
              </span>
            </li>
            <li className={cx('bar')} />
          </ul>
        </div>
        <div className={cx('customer-status-wrap')}>
          <h2>성별, 연령별 방문자 현황</h2>
          <ul className={cx('rank-wrap')}>
            <li className={cx('first', 'active')}>
              <Image src='/assets/svg/icon-1st.svg' width={21} height={28} />
              <span>20대 여성</span>
            </li>
            <li className={cx('second')}>
              <Image src='/assets/svg/icon-2nd.svg' width={21} height={28} />
              <span>40대 여성</span>
            </li>
            <li className={cx('third')}>
              <Image src='/assets/svg/icon-3rd.svg' width={21} height={28} />
              <span>60대 여성</span>
            </li>
            <li className={cx('bar')} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default dataContent;

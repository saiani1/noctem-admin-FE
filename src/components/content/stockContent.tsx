import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/stockContent.module.scss';

function stockContent() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('wrap')}>
      <h1>재고관리</h1>
      <div className={cx('content-wrap')}>
        <table>
          <colgroup>
            <col width='1%' />
            <col width='10%' />
            <col width='5%' />
            <col width='5%' />
            <col width='5%' />
            <col width='2%' />
          </colgroup>
          <thead>
            <tr>
              <th> </th>
              <th>제품명</th>
              <th>구입일</th>
              <th>유통기한</th>
              <th>잔고</th>
              <th>주문</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={cx('input-wrap')}>
                <input type='checkbox' />
                <img src='/assets/svg/icon-check.svg' alt='check' />
              </td>
              <td>블랙글레이즈시럽</td>
              <td>2022.07.07</td>
              <td>2022.08.07</td>
              <td>10통</td>
              <td className={cx('order-wrap')}>
                <input type='number' min='1' />
                <button type='button' className={cx('order-btn')}>
                  발주
                </button>
              </td>
            </tr>
            <tr>
              <td className={cx('input-wrap')}>
                <input type='checkbox' />
                <img src='/assets/svg/icon-check.svg' alt='check' />
              </td>
              <td>초코쿠키</td>
              <td>2022.07.07</td>
              <td>2022.09.07</td>
              <td>2개</td>
              <td className={cx('order-wrap')}>
                <input type='number' min='1' />
                <button type='button' className={cx('order-btn')}>
                  발주
                </button>
              </td>
            </tr>
            <tr>
              <td className={cx('input-wrap')}>
                <input type='checkbox' />
                <img src='/assets/svg/icon-check.svg' alt='check' />
              </td>
              <td>마시멜로우</td>
              <td>2022.07.07</td>
              <td>2022.08.01</td>
              <td>1봉지</td>
              <td className={cx('order-wrap')}>
                <input type='number' min='1' />
                <button type='button' className={cx('order-btn')}>
                  발주
                </button>
              </td>
            </tr>
            <tr>
              <td className={cx('input-wrap')}>
                <input type='checkbox' />
                <img src='/assets/svg/icon-check.svg' alt='check' />
              </td>
              <td>팝핑캔디</td>
              <td>2022.07.07</td>
              <td>2022.07.17</td>
              <td>4통</td>
              <td className={cx('order-wrap')}>
                <input type='number' min='1' />
                <button type='button' className={cx('order-btn')}>
                  발주
                </button>
              </td>
            </tr>
            <tr />
            <tr />
            <tr />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default stockContent;

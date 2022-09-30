import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/common/menuBar.module.scss';

const cx = classNames.bind(styles);

function menubarList() {
  return (
    <div className={cx('menu-bar')}>
      <div className={cx('nav-content')}>
        <div>
          navLogo navLanguageSwitcher navUserMenu mainMenu navmobilebuttons
        </div>
      </div>
      <div className={cx('select-pointer')} />
      <ul className={cx('menu-list')}>
        <li>매장 관리</li>
        <li>메뉴 관리</li>
        <li>재고 관리</li>
        <li>직원 관리</li>
        <li>데이터 관리</li>
        <li className={cx('order-list')}>
          <div className={cx('order-request-title')}>
            <div>주문요청</div>
            <div>2</div>
          </div>
          <ul className={cx('order-request-list')}>
            <li>
              <div>주문요청</div>
              <div>2</div>
            </li>
            <li>
              <div>주문확인</div>
              <div>2</div>
            </li>
            <li>
              <div>제조완료</div>
              <div>3</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default menubarList;

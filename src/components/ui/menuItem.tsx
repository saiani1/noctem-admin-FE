import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/menuItem.module.scss';

function menuItem() {
  const cx = classNames.bind(styles);

  return (
    <li className={cx('menu-item-wrap')}>
      <div className={cx('dummy-img')} />
      <span className={cx('menu-name')}>블론드 바닐라 더블샷 마키아토</span>
      <div className={cx('btn-wrap')}>
        <button type='button' className={cx('soldout')}>
          품절처리
        </button>
        <button type='button' className={cx('restart')}>
          판매재개
        </button>
      </div>
    </li>
  );
}

export default menuItem;

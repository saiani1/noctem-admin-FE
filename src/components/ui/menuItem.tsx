import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/menuItem.module.scss';
import { IMenuList } from '../../types/menu.d';

interface IProps {
  menu: IMenuList;
}

function menuItem({ menu }: IProps) {
  const { menuName, imgUrl } = menu;
  const cx = classNames.bind(styles);

  return (
    <li className={cx('menu-item-wrap')}>
      <span className={cx('img-wrap')}>
        <img src={imgUrl} alt={menuName} />
      </span>
      <span className={cx('menu-name')}>{menuName}</span>
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

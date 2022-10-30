import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/drinkRankItem.module.scss';
import { IMenuList, IMenuInfo } from '../../types/data.d';
import { getMenuInfo } from '../../store/api/data';

interface IProps {
  menu: IMenuList;
}

function drinkRankItem({ menu }: IProps) {
  const { sizeId, rank, totalCount } = menu;
  const [menuInfo, setMenuInfo] = useState<IMenuInfo>();

  const cx = classNames.bind(styles);

  useEffect(() => {
    getMenuInfo(sizeId).then(res => {
      setMenuInfo(res.data.data);
    });
  }, []);

  return (
    <li className={cx('wrap')}>
      <div className={cx('tit-wrap')}>
        <img
          src={`/assets/svg/icon-${rank}.svg`}
          alt='menu'
          className={cx('rank-img')}
        />
        <span className={cx('menu-name', menu.rank === 1 ? 'active' : '')}>
          {menuInfo?.menuFullName}
        </span>
      </div>
      <span className={cx('img-wrap')}>
        <img src={menuInfo?.imgUrl} alt={menuInfo?.menuFullName} />
      </span>
      <span className={cx('total-count')}>
        {menu.totalCount.toLocaleString()}잔
      </span>
    </li>
  );
}

export default drinkRankItem;

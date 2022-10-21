import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/drinkRankItem.module.scss';
import { IMenuList, IMenuInfo } from '../../types/data.d';
import { getMenuInfo } from '../../../pages/api/data';

interface IProps {
  menu: IMenuList;
}

function drinkRankItem({ menu }: IProps) {
  const { sizeId, rank } = menu;
  const [menuInfo, setMenuInfo] = useState<IMenuInfo>();

  const cx = classNames.bind(styles);

  useEffect(() => {
    getMenuInfo(sizeId).then(res => setMenuInfo(res.data.data));
  }, []);

  return (
    <li className={cx('wrap')}>
      <div className={cx('tit-wrap')}>
        <img src={`/assets/svg/icon-${rank}.svg`} alt='menu' />
        <span className={cx('menu-name')}>{menuInfo?.menuFullName}</span>
      </div>
      <span className={cx('img-wrap')}>
        <img src={menuInfo?.imgUrl} alt={menuInfo?.menuFullName} />
      </span>
    </li>
  );
}

export default drinkRankItem;

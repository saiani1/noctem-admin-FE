import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/menuItem.module.scss';
import { addSoldOutMenu } from '../../../pages/api/menu';
import { IMenuList, ISoldOutList } from '../../types/menu.d';

interface IProps {
  menu: IMenuList;
  soldOutList: ISoldOutList[];
}

function menuItem({ menu, soldOutList }: IProps) {
  const { menuName, imgUrl, menuId } = menu;
  const [isSoldOut, setIsSoldOut] = useState(false);
  const cx = classNames.bind(styles);

  useEffect(() => {
    if (soldOutList.find((item: ISoldOutList) => item.soldOutMenuId === menuId))
      setIsSoldOut(true);
    else setIsSoldOut(false);
  }, []);

  const handleClickSoldOutBtn = (e: React.MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLInputElement;
    addSoldOutMenu(name).then(res => {
      if (res.data.data === true)
        setIsSoldOut(prev => {
          return !prev;
        });
    });
  };

  return (
    <li className={cx('menu-item-wrap')}>
      <span className={cx('img-wrap')}>
        <img src={imgUrl} alt={menuName} />
      </span>
      <span className={cx('menu-name')}>{menuName}</span>
      <div className={cx('btn-wrap')}>
        <button
          type='button'
          name={menuId}
          onClick={handleClickSoldOutBtn}
          className={cx(isSoldOut ? 'restart' : 'soldout')}
        >
          {isSoldOut ? '판매재개' : '품절처리'}
        </button>
      </div>
    </li>
  );
}

export default menuItem;

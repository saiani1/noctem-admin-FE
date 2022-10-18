/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/menuContent.module.scss';
import MenuItem from '../ui/menuItem';
import { getSmallCategory, getMenuList } from '../../../pages/api/menu';
import { ICategoryS, IMenuList } from '../../types/menu.d';

function menuContent() {
  const cx = classNames.bind(styles);
  const [category, setCategory] = useState<ICategoryS[]>([]);
  const [menuList, setMenuList] = useState<IMenuList[]>([]);
  const [clickTab, setClickTab] = useState('new');

  const handleClickTab = (e: React.MouseEvent<HTMLElement>) => {
    const { value } = e.target as HTMLInputElement;
    const { name } = e.target as HTMLInputElement;
    setClickTab(value);
    getMenuList(name).then(res => setMenuList(res.data.data));
  };

  useEffect(() => {
    getSmallCategory().then(res => setCategory(res.data.data));
  }, []);

  return (
    <div className={cx('wrap')}>
      <h1>메뉴 관리</h1>
      <div className={cx('menu-wrap')}>
        <ul className={cx('tab-wrap')}>
          {category &&
            category.map((tab: ICategoryS) => (
              <li key={tab.index}>
                <button
                  type='button'
                  className={cx(clickTab === tab.categorySName ? 'active' : '')}
                  name={tab.categorySId}
                  value={tab.categorySName}
                  onClick={handleClickTab}
                >
                  {tab.categorySName}
                </button>
              </li>
            ))}
        </ul>
        <ul className={cx('menu-li-wrap')}>
          {menuList &&
            menuList.map((menu: IMenuList) => (
              <MenuItem key={menu.menuId} menu={menu} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default menuContent;

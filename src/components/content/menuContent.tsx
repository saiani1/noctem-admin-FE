import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/menuContent.module.scss';
import MenuItem from '../ui/menuItem';
import {
  getSmallCategory,
  getMenuList,
  getSoldOutMenuList,
} from '../../store/api/menu';
import { ICategoryS, IMenuList, ISoldOutList } from '../../types/menu.d';

function menuContent() {
  const cx = classNames.bind(styles);
  const [category, setCategory] = useState<ICategoryS[]>([]);
  const [menuList, setMenuList] = useState<IMenuList[]>([]);
  const [soldOutList, setSoldOutList] = useState<ISoldOutList[]>([]);
  const [clickTab, setClickTab] = useState('리프레셔');

  const handleClickTab = (e: React.MouseEvent<HTMLElement>) => {
    const { value } = e.target as HTMLInputElement;
    const { name } = e.target as HTMLInputElement;
    setClickTab(value);
    Promise.all([getMenuList(name), getSoldOutMenuList()]).then(res => {
      setMenuList(res[0].data.data);
      setSoldOutList(res[1].data.data);
    });
  };

  useEffect(() => {
    getSmallCategory().then(res => {
      const sliceCategory = res.data.data.slice(1);
      console.log(sliceCategory);
      setCategory(sliceCategory);
    });

    Promise.all([getMenuList('3'), getSoldOutMenuList()]).then(res => {
      setMenuList(res[0].data.data);
      setSoldOutList(res[1].data.data);
    });
  }, []);

  return (
    <div className={cx('wrap', 'menuContent-wrap')}>
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
              <MenuItem
                key={menu.menuId}
                menu={menu}
                soldOutList={soldOutList}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default menuContent;

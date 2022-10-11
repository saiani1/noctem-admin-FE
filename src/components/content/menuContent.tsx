import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/pages/menuContent.module.scss';
import MenuItem from '../ui/menuItem';

function menuContent() {
  const cx = classNames.bind(styles);
  const [clickTab, setClickTab] = useState('에스프레소');

  const handleClickTab = (e: React.MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLInputElement;
    setClickTab(name);
  };

  return (
    <div className={cx('wrap')}>
      <h1>메뉴 관리</h1>
      <div className={cx('menu-wrap')}>
        <ul className={cx('tab-wrap')}>
          <li>
            <button
              type='button'
              className={cx(clickTab === '에스프레소' ? 'active' : '')}
              name='에스프레소'
              onClick={handleClickTab}
            >
              에스프레소
            </button>
          </li>
          <li>
            <button
              type='button'
              className={cx(clickTab === '디카페인' ? 'active' : '')}
              name='디카페인'
              onClick={handleClickTab}
            >
              디카페인
            </button>
          </li>
          <li>
            <button
              type='button'
              className={cx(clickTab === '프라푸치노' ? 'active' : '')}
              name='프라푸치노'
              onClick={handleClickTab}
            >
              프라푸치노
            </button>
          </li>
          <li>
            <button
              type='button'
              className={cx(clickTab === '블렌디드' ? 'active' : '')}
              name='블렌디드'
              onClick={handleClickTab}
            >
              블렌디드
            </button>
          </li>
          <li>
            <button
              type='button'
              className={cx(clickTab === '피지오' ? 'active' : '')}
              name='피지오'
              onClick={handleClickTab}
            >
              피지오
            </button>
          </li>
          <li>
            <button
              type='button'
              className={cx(clickTab === '티바나' ? 'active' : '')}
              name='티바나'
              onClick={handleClickTab}
            >
              티바나
            </button>
          </li>
          <li>
            <button
              type='button'
              className={cx(clickTab === '기타' ? 'active' : '')}
              name='기타'
              onClick={handleClickTab}
            >
              기타
            </button>
          </li>
        </ul>
        <ul className={cx('menu-li-wrap')}>
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </ul>
      </div>
    </div>
  );
}

export default menuContent;

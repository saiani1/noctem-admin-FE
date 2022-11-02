/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames/bind';

import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../../../styles/content/storeContent.module.scss';
import { getStoreInfo } from '../../store/api/store';
import { IStore } from '../../types/store.d';
import { tokenState } from '../../store/store/auth';
import { categoryState } from '../../store/store/category';

function storeContent() {
  const token = useRecoilValue(tokenState);
  const [storeInfo, setStoreInfo] = useState<IStore>();
  // const [clickMenu, setClickMenu] = useRecoilState(categoryState);
  const [clickMenu, setClickMenu] = useState('');
  const cx = classNames.bind(styles);

  useEffect(() => {
    getStoreInfo(token)
      .then(res => {
        setStoreInfo(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleClickMenu = (name: string) => {
    setClickMenu(name);
  };

  return (
    <div className={cx('wrap', 'store-wrap')}>
      <h1>매장 관리</h1>
      {storeInfo && (
        <div className={cx('store-info-wrap')}>
          <div className={cx('left')}>
            <span className={cx('img-wrap')}>
              <img src={storeInfo.mainImg} alt={storeInfo.name} />
            </span>
            <button type='button' className={cx('img-change-wrap')}>
              매장 이미지 수정 요청
            </button>
          </div>
          <div className={cx('right')}>
            <strong className={cx('store-name')}>{storeInfo.name}</strong>
            <dl>
              <dt>주소</dt>
              <dd>{storeInfo.address}</dd>
            </dl>
            <dl>
              <dt>영업시간</dt>
              <dd>
                {storeInfo.businessOpenHours} ~ {storeInfo.businessCloseHours}
              </dd>
            </dl>
            <dl>
              <dt>관리자</dt>
              <dd>박찬우</dd>
            </dl>
            <dl>
              <dt>책임자</dt>
              <dd>양진기</dd>
            </dl>
            <dl>
              <dt>번호</dt>
              <dd>{storeInfo.contactNumber}</dd>
            </dl>
          </div>
        </div>
      )}

      <ul className={cx('sub-menu-wrap')}>
        <li>
          <Link href='menu'>
            <a
              role='presentation'
              onClick={() => handleClickMenu('menu')}
              onKeyDown={() => handleClickMenu('menu')}
            >
              <span className={cx('img-wrap')}>
                <Image
                  src='/assets/svg/icon-juice.svg'
                  width={97}
                  height={97}
                />
              </span>
              <span className={cx('tit')}>메뉴 관리</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href='stock'>
            <a
              role='presentation'
              onClick={() => handleClickMenu('stock')}
              onKeyDown={() => handleClickMenu('stock')}
            >
              <span className={cx('img-wrap')}>
                <Image
                  src='/assets/svg/icon-stock.svg'
                  width={97}
                  height={97}
                />
              </span>
              <span className={cx('tit')}>재고 관리</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href='crew'>
            <a
              role='presentation'
              onClick={() => handleClickMenu('crew')}
              onKeyDown={() => handleClickMenu('crew')}
            >
              <span className={cx('img-wrap')}>
                <Image
                  src='/assets/svg/icon-employees.svg'
                  width={97}
                  height={97}
                />
              </span>
              <span className={cx('tit')}>직원 관리</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href='data'>
            <a
              role='presentation'
              onClick={() => handleClickMenu('data')}
              onKeyDown={() => handleClickMenu('data')}
            >
              <span className={cx('img-wrap')}>
                <Image
                  src='/assets/svg/icon-analytics.svg'
                  width={97}
                  height={97}
                />
              </span>
              <span className={cx('tit')}>데이터 관리</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default storeContent;

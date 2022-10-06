import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../styles/pages/main.module.scss';

function mainPage() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('wrap')}>
      <h1>매장 관리</h1>
      <div className={cx('store-info-wrap')}>
        <div className={cx('left')}>
          <span className={cx('img-wrap')}>
            <Image
              src='/assets/images/jpg/store.jpg'
              width={180}
              height={180}
            />
          </span>
          <button type='button' className={cx('img-change-wrap')}>
            매장 이미지 수정 요청
          </button>
        </div>
        <div className={cx('right')}>
          <strong className={cx('store-name')}>
            센텀드림월드<span>점</span>
          </strong>
          <dl>
            <dt>주소</dt>
            <dd>부산광역시 해운대구 센텀2로 25 (센텀드림월드)</dd>
          </dl>
          <dl>
            <dt>영업시간</dt>
            <dd>07:00 ~ 20:00</dd>
          </dl>
          <dl>
            <dt>관리자</dt>
            <dd>박찬우</dd>
          </dl>
          <dl>
            <dt>책임자</dt>
            <dd>박수아</dd>
          </dl>
          <dl>
            <dt>번호</dt>
            <dd>1577-1577</dd>
          </dl>
        </div>
        <button type='button' className={cx('setting-btn')}>
          <span>
            <Image src='/assets/svg/icon-setting.svg' width={33} height={33} />
          </span>
        </button>
      </div>

      <ul className={cx('sub-menu-wrap')}>
        <li>
          <button type='button'>
            <span className={cx('img-wrap')}>
              <Image src='/assets/svg/icon-juice.svg' width={97} height={97} />
            </span>
            <span className={cx('tit')}>메뉴 관리</span>
          </button>
        </li>
        <li>
          <button type='button'>
            <span className={cx('img-wrap')}>
              <Image src='/assets/svg/icon-stock.svg' width={97} height={97} />
            </span>
            <span className={cx('tit')}>재고 관리</span>
          </button>
        </li>
        <li>
          <button type='button'>
            <span className={cx('img-wrap')}>
              <Image
                src='/assets/svg/icon-employees.svg'
                width={97}
                height={97}
              />
            </span>
            <span className={cx('tit')}>직원 관리</span>
          </button>
        </li>
        <li>
          <button type='button'>
            <span className={cx('img-wrap')}>
              <Image
                src='/assets/svg/icon-analytics.svg'
                width={97}
                height={97}
              />
            </span>
            <span className={cx('tit')}>데이터 관리</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default mainPage;

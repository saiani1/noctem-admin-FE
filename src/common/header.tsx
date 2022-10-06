import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import styles from '../../styles/common/header.module.scss';

function header() {
  const cx = classNames.bind(styles);
  dayjs.locale('ko');
  const date = dayjs(new Date()).format('YYYY년 MM월 DD일');
  const time = dayjs(new Date()).format('A HH시 mm분');

  return (
    <header className={cx('wrap')}>
      <ul>
        <li>{date}</li>
        <li>{time}</li>
        <li className={cx('profile-wrap')}>
          <button type='button'>
            <div className={cx('img')} />
            <span>센텀드림월드점</span>
          </button>
        </li>
        <li className={cx('alert-wrap')}>
          <button type='button' className={cx('active')} aria-label='alery'>
            <span>
              <Image src='/assets/svg/icon-alert.svg' width={23} height={23} />
            </span>
          </button>
        </li>
      </ul>
    </header>
  );
}

export default header;

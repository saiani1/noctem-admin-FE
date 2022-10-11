import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import styles from '../styles/pages/login.module.scss';

function login() {
  const cx = classNames.bind(styles);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <form className={cx('wrap')} onSubmit={handleSubmit}>
      <div className={cx('tit-wrap')}>
        <Image src='/assets/svg/icon-lock.svg' width={40} height={55} />
        <h1>
          <strong>ADMIN</strong> LOGIN
        </h1>
        <span className={cx('sub-tit')}>카페녹템 관리자페이지입니다.</span>
      </div>
      <div className={cx('input-wrap')}>
        <input type='text' placeholder='ID' />
        <input type='password' placeholder='Password' />
      </div>
      <button type='submit' className={cx('submit-btn')}>
        로그인
      </button>
    </form>
  );
}

export default login;

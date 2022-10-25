import React, { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import styles from '../styles/pages/login.module.scss';
import { storeLogin } from '../src/store/api/login';
import { setToken } from '../src/store/utils/token';

interface IProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function login({ setIsLogin }: IProps) {
  const router = useRouter();
  const idInputRef = useRef<HTMLInputElement>(null);
  const pwInputRef = useRef<HTMLInputElement>(null);
  const cx = classNames.bind(styles);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const id = idInputRef.current?.value;
    const pw = pwInputRef.current?.value;
    storeLogin(id, pw).then(res => {
      if (res.headers.authorization !== undefined) {
        setToken(res.headers.authorization);
        setIsLogin(true);
        router.push('/');
      }
    });
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
        <input type='text' placeholder='ID' ref={idInputRef} />
        <input type='password' placeholder='Password' ref={pwInputRef} />
      </div>
      <button type='submit' className={cx('submit-btn')}>
        로그인
      </button>
    </form>
  );
}

export default login;

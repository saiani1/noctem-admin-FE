import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { loginState, tokenState } from '../../store/store/auth';
import { categoryState } from '../../store/store/category';
import styles from '../../../styles/content/login.module.scss';
import { storeLogin } from '../../store/api/login';

function loginContent() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [, setToken] = useRecoilState(tokenState);
  const [, setClickMenu] = useRecoilState(categoryState);

  const idInputRef = useRef<HTMLInputElement>(null);
  const pwInputRef = useRef<HTMLInputElement>(null);
  const cx = classNames.bind(styles);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const id = idInputRef.current?.value;
    const pw = pwInputRef.current?.value;
    storeLogin(id, pw)
      .then(res => {
        if (res.headers.authorization !== undefined) {
          setToken(res.headers.authorization);
          setIsLogin(true);
          setClickMenu('store');
          router.push('/store');
        }
      })
      .catch(err => {
        const ERR: { [key: number]: boolean } = {
          2016: true,
          2017: true,
          2020: true,
        };
        const errCode: number = err.response.data.errorCode;
        if (ERR[errCode]) {
          toast.error(
            '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.',
          );
          idInputRef.current?.focus();
        }
      });
  };

  if (isLogin) {
    setClickMenu('store');
    router.push('/store');
  }

  return (
    <form className={cx('header-wrap')} onSubmit={handleSubmit}>
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

export default loginContent;

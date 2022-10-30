import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import toast from 'react-hot-toast';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { useRecoilState } from 'recoil';
import styles from '../../../styles/common/header.module.scss';
import { getStoreInfo } from '../../store/api/store';
import { loginState, tokenState } from '../../store/store/auth';

interface IStore {
  managerId: number;
  supervisorId: null;
  name: string;
  mainImg: string;
  address: string;
  wayToCome: string;
  businessOpenHours: string;
  businessCloseHours: string;
  isOpen: boolean;
  isParking: boolean;
  isEcoStore: boolean;
  isDriveThrough: boolean;
  contactNumber: string;
}

const cx = classNames.bind(styles);

function header() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [token, setToken] = useRecoilState(tokenState);
  const [storeInfo, setStoreInfo] = useState<IStore>();

  dayjs.locale('ko');
  const [date, setDate] = useState(dayjs(new Date()).format('YYYY년 M월 D일'));
  const [time, setTime] = useState(dayjs(new Date()).format('A h시 m분 ss초'));
  const [updateTime, setUpdateTime] = useState(0);

  useEffect(() => {
    const setTimer = setTimeout(() => {
      setDate(dayjs(new Date()).format('YYYY년 M월 D일'));
      setTime(dayjs(new Date()).format('A hh시 m분 ss초'));
      setUpdateTime(updateTime + 1);
    }, 1000);

    return () => {
      clearTimeout(setTimer);
    };
  }, [updateTime]);

  useEffect(() => {
    if (token !== '') {
      getStoreInfo(token)
        .then(res => {
          setStoreInfo(res.data.data);
        })
        .catch(err => console.log(err));
    }
  }, []);

  const handleLogout = () => {
    setIsLogin(false);
    setToken('');
    toast.success('로그아웃 되셨습니다.');
    router.push('/');
  };

  if (!isLogin) {
    return null;
  }

  return (
    <header className={cx('wrap')}>
      <ul>
        <li>{date}</li>
        <li>{time}</li>
        <li className={cx('profile-wrap')}>
          <button type='button'>
            <span className={cx('img-wrap')}>
              <img src={storeInfo?.mainImg} alt={storeInfo?.name} />
            </span>
            <span>{storeInfo?.name}</span>
          </button>
        </li>
        <li>
          <button
            type='button'
            className={cx('logout-btn')}
            onClick={handleLogout}
          >
            로그아웃
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

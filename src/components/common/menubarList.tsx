import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import classNames from 'classnames/bind';
import { getRequest, getConfirm, getCompletion } from '../../store/api/order';
import {
  requestState,
  confirmState,
  completionState,
} from '../../store/store/orderState';
import styles from '../../../styles/common/menuBar.module.scss';
import { loginState, tokenState } from '../../store/store/auth';
import { categoryState } from '../../store/store/category';
import { ArrowBtn } from '../../../public/assets/svg';

const cx = classNames.bind(styles);

function menubarList() {
  const router = useRouter();
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const clickMenu = useRecoilValue(categoryState);
  const [request, setRequest] = useRecoilState(requestState);
  const [confirm, setConfirm] = useRecoilState(confirmState);
  const [completion, setCompletion] = useRecoilState(completionState);
  const [clickMenuTemp, setClickMenuTemp] = useRecoilState(categoryState);
  const [isLoginTemp, setIsLoginTemp] = useState(false);
  const [miniMode, setMiniMode] = useState(false);

  const handleClickMenu = (e: React.MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLInputElement;
    setClickMenuTemp(name);
    router.push(`/${name}`);
  };
  const handleMenuSize = () => {
    setMiniMode(!miniMode);
  };

  useEffect(() => {
    if (isLogin) {
      getOrderData();
      setClickMenuTemp(clickMenu);
      setIsLoginTemp(true);
    } else {
      setIsLoginTemp(false);
    }
  }, [isLogin]);

  const getOrderData = () => {
    if (isLogin) {
      getRequest(token).then(res => {
        setRequest(res.data.data);
      });
      getConfirm(token).then(res => {
        setConfirm(res.data.data);
      });
      getCompletion(token).then(res => {
        setCompletion(res.data.data);
      });
    }
  };

  if (!isLoginTemp) {
    return null;
  }

  return (
    <div className={miniMode === false ? cx('menu-bar') : cx('menu-bar-mini')}>
      <button
        type='button'
        className={cx('hanburger')}
        onClick={handleMenuSize}
      >
        <ArrowBtn className={cx('icon')} />
      </button>
      <ul className={cx('menu-list')}>
        <li
          className={cx(
            'menu',
            'main',
            clickMenuTemp === 'store' ? 'active' : '',
          )}
        >
          {miniMode === false ? (
            <button type='button' name='store' onClick={handleClickMenu}>
              매장 관리
            </button>
          ) : (
            <button type='button' name='store' onClick={handleClickMenu}>
              <Image src='/assets/svg/icon-shop.svg' width={18} height={18} />
            </button>
          )}
        </li>
        <li
          className={cx(
            'menu',
            'menus',
            clickMenuTemp === 'menu' ? 'active' : '',
          )}
        >
          {miniMode === false ? (
            <button type='button' name='menu' onClick={handleClickMenu}>
              메뉴 관리
            </button>
          ) : (
            <button type='button' name='menu' onClick={handleClickMenu}>
              <Image src='/assets/svg/icon-juice.svg' width={18} height={18} />
            </button>
          )}
        </li>
        <li
          className={cx(
            'menu',
            'stock',
            clickMenuTemp === 'stock' ? 'active' : '',
          )}
        >
          {miniMode === false ? (
            <button type='button' name='stock' onClick={handleClickMenu}>
              재고 관리
            </button>
          ) : (
            <button type='button' name='stock' onClick={handleClickMenu}>
              <Image src='/assets/svg/icon-stock.svg' width={18} height={18} />
            </button>
          )}
        </li>
        <li
          className={cx(
            'menu',
            'crew',
            clickMenuTemp === 'crew' ? 'active' : '',
          )}
        >
          {miniMode === false ? (
            <button type='button' name='crew' onClick={handleClickMenu}>
              직원 관리
            </button>
          ) : (
            <button type='button' name='crew' onClick={handleClickMenu}>
              <Image
                src='/assets/svg/icon-employees.svg'
                width={18}
                height={18}
              />
            </button>
          )}
        </li>
        <li
          className={cx(
            'menu',
            'data',
            clickMenuTemp === 'data' ? 'active' : '',
          )}
        >
          {miniMode === false ? (
            <button type='button' name='data' onClick={handleClickMenu}>
              데이터 관리
            </button>
          ) : (
            <button type='button' name='data' onClick={handleClickMenu}>
              <Image
                src='/assets/svg/icon-analytics.svg'
                width={18}
                height={18}
              />
            </button>
          )}
        </li>
        <li
          className={cx(
            'order-list',
            clickMenuTemp === 'order' ? 'active' : '',
          )}
        >
          <button type='button' name='order' onClick={handleClickMenu}>
            {miniMode === false ? (
              <>
                <div className={cx('order-request-title')}>
                  <div>주문요청</div>
                  <span>{request.length}</span>
                </div>
                <ul className={cx('order-request-list')}>
                  <li>
                    <div>주문요청</div>
                    <span>{request.length}</span>
                  </li>
                  <li>
                    <div>제조중</div>
                    <span>{confirm.length}</span>
                  </li>
                  <li>
                    <div>제조완료</div>
                    <span>{completion.length}</span>
                  </li>
                </ul>
              </>
            ) : (
              <>
                {' '}
                <div className={cx('order-request-title')}>
                  <div />
                  <span>{request.length}</span>
                </div>
                <ul className={cx('order-request-list')}>
                  <li>
                    <div />
                    <span>{request.length}</span>
                  </li>
                  <li>
                    <div />
                    <span>{confirm.length}</span>
                  </li>
                  <li>
                    <div />
                    <span>{completion.length}</span>
                  </li>
                </ul>
              </>
            )}
          </button>
        </li>
        <li className={cx('menu', 'slider')} />
      </ul>
    </div>
  );
}

export default menubarList;

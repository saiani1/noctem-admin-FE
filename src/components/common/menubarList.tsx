import React, { useEffect, useState } from 'react';
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

const cx = classNames.bind(styles);

function menubarList() {
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);
  const [request, setRequest] = useRecoilState(requestState);
  const [confirm, setConfirm] = useRecoilState(confirmState);
  const [completion, setCompletion] = useRecoilState(completionState);
  const [isLoginTemp, setIsLoginTemp] = useState(false);
  const [requestLengthTemp, setRequestLengthTemp] = useState(0);
  const [confirmLengthTemp, setConfirmLengthTemp] = useState(0);
  const [completionLengthTemp, setCompletionLengthTemp] = useState(0);
  const router = useRouter();

  const [clickMenu, setClickMenu] = useRecoilState(categoryState);
  const [clickMenuTemp, setClickMenuTemp] = useState('store');

  const handleClickMenu = (e: React.MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLInputElement;
    setClickMenu(name);
    router.push(`/${name}`);
  };

  useEffect(() => {
    getOrderData();
    setClickMenuTemp(clickMenu);
    setIsLoginTemp(isLogin);
    setRequestLengthTemp(request.length);
    setConfirmLengthTemp(confirm.length);
    setCompletionLengthTemp(completion.length);
  }, []);

  const getOrderData = () => {
    getRequest(token).then(res => {
      setRequest(res.data.data);
    });
    getConfirm(token).then(res => {
      setConfirm(res.data.data);
    });
    getCompletion(token).then(res => {
      setCompletion(res.data.data);
    });
  };

  if (!isLoginTemp) {
    return null;
  }

  return (
    <div className={cx('menu-bar')}>
      <ul className={cx('menu-list')}>
        <li
          className={cx(
            'menu',
            'main',
            clickMenuTemp === 'store' ? 'active' : '',
          )}
        >
          <button type='button' name='store' onClick={handleClickMenu}>
            매장 관리
          </button>
        </li>
        <li
          className={cx(
            'menu',
            'menus',
            clickMenuTemp === 'menu' ? 'active' : '',
          )}
        >
          <button type='button' name='menu' onClick={handleClickMenu}>
            메뉴 관리
          </button>
        </li>
        <li
          className={cx(
            'menu',
            'stock',
            clickMenuTemp === 'stock' ? 'active' : '',
          )}
        >
          <button type='button' name='stock' onClick={handleClickMenu}>
            재고 관리
          </button>
        </li>
        <li
          className={cx(
            'menu',
            'crew',
            clickMenuTemp === 'crew' ? 'active' : '',
          )}
        >
          <button type='button' name='crew' onClick={handleClickMenu}>
            직원 관리
          </button>
        </li>
        <li
          className={cx(
            'menu',
            'data',
            clickMenuTemp === 'data' ? 'active' : '',
          )}
        >
          <button type='button' name='data' onClick={handleClickMenu}>
            데이터 관리
          </button>
        </li>
        <li
          className={cx(
            'order-list',
            clickMenuTemp === 'order' ? 'active' : '',
          )}
        >
          <button type='button' name='order' onClick={handleClickMenu}>
            <div className={cx('order-request-title')}>
              <div>주문요청</div>
              <span>{requestLengthTemp}</span>
            </div>
            <ul className={cx('order-request-list')}>
              <li>
                <div>주문요청</div>
                <span>{requestLengthTemp}</span>
              </li>
              <li>
                <div>제조중</div>
                <span>{confirmLengthTemp}</span>
              </li>
              <li>
                <div>제조완료</div>
                <span>{completionLengthTemp}</span>
              </li>
            </ul>
          </button>
        </li>
        <li className={cx('menu', 'slider')} />
      </ul>
    </div>
  );
}

export default menubarList;

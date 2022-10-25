/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import { getRequest, getConfirm, getCompletion } from '../store/api/order';
import { IList } from '../../public/assets/datas/requestList';

import styles from '../../styles/common/menuBar.module.scss';

function menubarList() {
  const [request, setRequest] = useState<IList[]>([]);
  const [confirm, setConfirm] = useState<IList[]>([]);
  const [completion, setCompletion] = useState<IList[]>([]);
  const cx = classNames.bind(styles);
  const router = useRouter();

  const [clickMenu, setClickMenu] = useState('store');

  const handleClickMenu = (e: React.MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLInputElement;
    setClickMenu(name);
    router.push(`/${name}`);
  };
  useEffect(() => {
    getRequest().then(res => {
      setRequest(res.data.data);
    });
    getConfirm().then(res => {
      setConfirm(res.data.data);
    });
    getCompletion().then(res => {
      setCompletion(res.data.data);
    });
  }, []);

  return (
    <div className={cx('menu-bar')}>
      <ul className={cx('menu-list')}>
        <li
          className={cx('menu', 'main', clickMenu === 'store' ? 'active' : '')}
        >
          <button type='button' name='store' onClick={handleClickMenu}>
            매장 관리
          </button>
        </li>
        <li
          className={cx('menu', 'menus', clickMenu === 'menu' ? 'active' : '')}
        >
          <button type='button' name='menu' onClick={handleClickMenu}>
            메뉴 관리
          </button>
        </li>
        <li
          className={cx('menu', 'stock', clickMenu === 'stock' ? 'active' : '')}
        >
          <button type='button' name='stock' onClick={handleClickMenu}>
            재고 관리
          </button>
        </li>
        <li
          className={cx('menu', 'crew', clickMenu === 'crew' ? 'active' : '')}
        >
          <button type='button' name='crew' onClick={handleClickMenu}>
            직원 관리
          </button>
        </li>
        <li
          className={cx('menu', 'data', clickMenu === 'data' ? 'active' : '')}
        >
          <button type='button' name='data' onClick={handleClickMenu}>
            데이터 관리
          </button>
        </li>
        <li className={cx('order-list', clickMenu === 'order' ? 'active' : '')}>
          <button type='button' name='order' onClick={handleClickMenu}>
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
                <div>주문확인</div>
                <span>{confirm.length}</span>
              </li>
              <li>
                <div>제조완료</div>
                <span>{completion.length}</span>
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

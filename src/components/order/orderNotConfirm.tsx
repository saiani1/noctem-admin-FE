import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/pages/order.module.scss';

const cx = classNames.bind(styles);

function orderNotConfirm({
  item,
  setOpenOrderList,
  openOrderList,
}: {
  item: any;
  setOpenOrderList: React.Dispatch<React.SetStateAction<boolean>>;
  openOrderList: boolean;
}) {
  const handleOpenOrderList = () => {
    setOpenOrderList(!openOrderList);
  };
  return (
    <div
      role='presentation'
      onClick={() => handleOpenOrderList()}
      onKeyDown={() => handleOpenOrderList()}
    >
      {/* {' '} */}
      <div className={cx('complete-card')}>
        <div className={cx('drink-title')}>아이스 블랙 그레이즈드 라떼</div>
        <div className={cx('drink-detail')}>
          ICED|Tall|매장컵|에스프레소 샷1|물 많이|얼음 적게|일반휘핑 많이|초콜릿
          드리즐
        </div>

        <div className={(cx('nickname'), cx('gray'))}>닉네임</div>
        <div className={(cx('order-time'), cx('gray'))}>15:14:30</div>
      </div>
      <hr />
    </div>
  );
}

export default orderNotConfirm;

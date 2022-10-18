import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/pages/order.module.scss';

const cx = classNames.bind(styles);

function orderNotConfirm({
  item,
  setOpenOrderList,
  openOrderList,
  setMenuList,
}: {
  item: any;
  setOpenOrderList: React.Dispatch<React.SetStateAction<boolean>>;
  openOrderList: boolean;
  setMenuList: React.Dispatch<React.SetStateAction<undefined>>;
}) {
  const handleOpenOrderList = () => {
    setOpenOrderList(!openOrderList);
  };
  useEffect(() => {
    setMenuList(item.menuList);
  }, []);
  return (
    <div
      role='presentation'
      onClick={() => handleOpenOrderList()}
      onKeyDown={() => handleOpenOrderList()}
    >
      {/* {' '} */}
      <div className={cx('complete-card')}>
        <div className={cx('drink-title')}>
          {item.menuList[0].menuName} 외 {item.orderTotalQty - 1}개
        </div>
        <div className={cx('drink-detail')}>
          ICED|Tall|매장컵|에스프레소 샷1|물 많이|얼음 적게|일반휘핑 많이|초콜릿
          드리즐
        </div>

        <div className={(cx('nickname'), cx('gray'))}>{item.userNickname}</div>
        <div className={(cx('order-time'), cx('gray'))}>15:14:30</div>
      </div>
      <hr />
    </div>
  );
}

export default orderNotConfirm;

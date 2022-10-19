import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/pages/order.module.scss';

const cx = classNames.bind(styles);

function orderNotConfirm({
  item,
  setOpenOrderList,
  openOrderList,
  setMenuList,
  setOrderPurchaseId,
  orderPurchaseId,
}: {
  item: any;
  setOpenOrderList: React.Dispatch<React.SetStateAction<boolean>>;
  openOrderList: boolean;
  setMenuList: React.Dispatch<React.SetStateAction<undefined>>;
  setOrderPurchaseId: React.Dispatch<React.SetStateAction<number>>;
  orderPurchaseId: number;
}) {
  const handleOpenOrderList = (purchaseId: number) => {
    setOpenOrderList(!openOrderList);
    setOrderPurchaseId(purchaseId);
  };
  useEffect(() => {
    setMenuList(item.menuList);
  }, []);
  return (
    <div
      role='presentation'
      onClick={() => handleOpenOrderList(item.index)}
      onKeyDown={() => handleOpenOrderList(item.index)}
    >
      {/* {' '} */}
      <div className={cx('complete-card')}>
        <div className={cx('drink-title')}>
          {item.orderTotalQty === 1 ? (
            <> {item.menuList[0].menuName}</>
          ) : (
            <>
              {' '}
              {item.menuList[0].menuName} 외 {item.orderTotalQty - 1}개
            </>
          )}
        </div>
        <div className={cx('drink-detail')}>
          {/* ICED|Tall|매장컵|에스프레소 샷1|물 많이|얼음 적게|일반휘핑
            많이|초콜릿 드리즐 */}
          <ul className={cx('option-list')}>
            {item.menuList[0].optionList.map((option: any) => (
              <li key={option.index}>{option.personalOptionNameAndAmount}</li>
            ))}
          </ul>
        </div>

        <div className={(cx('nickname'), cx('gray'))}>{item.userNickname}</div>
        <div className={(cx('order-time'), cx('gray'))}>15:14:30</div>
      </div>
      <hr />
    </div>
  );
}

export default orderNotConfirm;

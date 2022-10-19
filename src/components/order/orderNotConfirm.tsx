import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/pages/order.module.scss';
import OrderListContent from './orderListContent';

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
  console.log('item', item);
  return (
    <>
      <div
        role='presentation'
        onClick={() => handleOpenOrderList(item.index)}
        onKeyDown={() => handleOpenOrderList(item.index)}
      >
        {/* {' '} */}
        <div className={cx('complete-card')}>
          <div className={cx('drink-title')}>
            {item.menuList[0].menuName} 외 {item.orderTotalQty - 1}개
          </div>
          <div className={cx('drink-detail')}>
            ICED|Tall|매장컵|에스프레소 샷1|물 많이|얼음 적게|일반휘핑
            많이|초콜릿 드리즐
          </div>

          <div className={(cx('nickname'), cx('gray'))}>
            {item.userNickname}
          </div>
          <div className={(cx('order-time'), cx('gray'))}>15:14:30</div>
        </div>
        <hr />
      </div>

      {/* {   
      openOrderList && (
          <div className={cx('open-order-list')}>
            <div
              role='presentation'
              className={cx('black-background')}
              onClick={() => handleOpenOrderList(item.purchaseId)}
              onKeyDown={() => handleOpenOrderList(item.purchaseId)}
            />
            <div className={cx('order-list-content')}>
              <div>
                <h2>주문 상세 정보</h2>
                <p>총 2잔</p>
              </div>
              {item.menuList[].map(itemList => (
                <OrderListContent
                  itemList={itemList}
                  key={item.index}
                  orderPurchaseId={orderPurchaseId}
                />
              ))}
              <div>
                <button type='button'>닫기</button>
              </div>
            </div>
          </div>
        )} */}
    </>
  );
}

export default orderNotConfirm;

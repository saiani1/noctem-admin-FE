import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/pages/order.module.scss';
import {
  patchOrderCompleted,
  getConfirm,
  getCompletion,
} from '../../../pages/api/order';
import { IList } from '../../../public/assets/datas/requestList';

const cx = classNames.bind(styles);

function orderNotConfirm({
  item,
  setRequestOpenOrderList,
  setConfirmOpenOrderList,
  setopenCompletionOrderList,
  openRequestOrderList,
  openConfirmOpenOrderList,
  openCompletionOrderList,
  setMenuList,
  setOrderConfirm,
  setCompletion,
  setOrderPurchaseId,
  setModalState,
  isRequest,
  isConfirm,
  isCompletion,
}: {
  item: any;
  setRequestOpenOrderList: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmOpenOrderList: React.Dispatch<React.SetStateAction<boolean>>;
  setopenCompletionOrderList: React.Dispatch<React.SetStateAction<boolean>>;
  openRequestOrderList: boolean;
  openConfirmOpenOrderList: boolean;
  openCompletionOrderList: boolean;
  setMenuList: React.Dispatch<React.SetStateAction<undefined>>;
  setOrderConfirm: React.Dispatch<React.SetStateAction<IList[]>>;
  setCompletion: React.Dispatch<React.SetStateAction<IList[]>>;
  setOrderPurchaseId: React.Dispatch<React.SetStateAction<number>>;
  setModalState: React.Dispatch<React.SetStateAction<string>>;
  isRequest: boolean;
  isConfirm: boolean;
  isCompletion: boolean;
}) {
  const handleOpenOrderList = (purchaseId: number) => {
    if (isRequest === true) {
      setRequestOpenOrderList(!openRequestOrderList);
      setOrderPurchaseId(purchaseId);
    }
    if (isConfirm === true) {
      setConfirmOpenOrderList(!openConfirmOpenOrderList);
      setOrderPurchaseId(purchaseId);
    }
    if (isCompletion === true) {
      setopenCompletionOrderList(!openCompletionOrderList);
      setOrderPurchaseId(purchaseId);
    }
  };
  const handleAccept = (e: any) => {
    e.stopPropagation();
    patchOrderCompleted(item.purchaseId).then(res => {
      console.log(res.data);
    });
    getConfirm().then(res => {
      setOrderConfirm(res.data.data);
    });
    getCompletion().then(res => {
      setCompletion(res.data.data);
    });
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
        <div className={cx('etc')}>
          <div>
            <div className={(cx('nickname'), cx('gray'))}>
              {item.userNickname}
            </div>
            <div className={(cx('order-time'), cx('gray'))}>
              {item.orderRequestTime}
            </div>
          </div>
          {isConfirm === true ? (
            <button type='button' onClick={handleAccept}>
              완료
            </button>
          ) : undefined}
        </div>
      </div>
      <hr />
    </div>
  );
}

export default orderNotConfirm;

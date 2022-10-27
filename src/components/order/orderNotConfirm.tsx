import React from 'react';
import classNames from 'classnames/bind';
import swal from 'sweetalert';
import { useRecoilValue } from 'recoil';
import styles from '../../../styles/pages/order.module.scss';
import {
  patchOrderCompleted,
  getConfirm,
  getCompletion,
} from '../../store/api/order';
import { IList } from '../../../public/assets/datas/requestList';
import { tokenState } from '../../store/store/auth';

const cx = classNames.bind(styles);

function orderNotConfirm({
  item,
  setRequestOpenOrderList,
  setConfirmOpenOrderList,
  setopenCompletionOrderList,
  openRequestOrderList,
  openConfirmOpenOrderList,
  openCompletionOrderList,
  setOrderConfirm,
  setCompletion,
  setOrderPurchaseId,
  // setModalState,
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
  setOrderConfirm: React.Dispatch<React.SetStateAction<IList[]>>;
  setCompletion: React.Dispatch<React.SetStateAction<IList[]>>;
  setOrderPurchaseId: React.Dispatch<React.SetStateAction<number>>;
  setModalState: React.Dispatch<React.SetStateAction<string>>;
  isRequest: boolean;
  isConfirm: boolean;
  isCompletion: boolean;
}) {
  const token = useRecoilValue(tokenState);

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
  const handleAcceptClick = (e: any) => {
    e.stopPropagation();
    swal({
      text: '음료 제조가 완료되었습니까?',
      buttons: ['no', 'yes'],
    }).then(willDelete => {
      if (willDelete) {
        patchOrderCompleted(item.purchaseId, token).then(() => {
          getConfirm(token).then(resConfirm => {
            setOrderConfirm(resConfirm.data.data);
          });
          getCompletion(token).then(resCompletion => {
            setCompletion(resCompletion.data.data);
          });
        });
      } else {
        console.log('취소');
      }
    });
  };
  // const handleAccept = () => {
  //   patchOrderCompleted(item.purchaseId).then(res => {
  //     getConfirm().then(resConfirm => {
  //       setOrderConfirm(resConfirm.data.data);
  //     });
  //     getCompletion().then(resCompletion => {
  //       setCompletion(resCompletion.data.data);
  //     });
  //   });
  // };
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
            <> {item.menuList[0]?.menuName}</>
          ) : (
            <>
              {' '}
              {item.menuList[0]?.menuName} 외 {item.orderTotalQty - 1}개
            </>
          )}
        </div>
        <div className={cx('drink-detail')}>
          <ul className={cx('option-list')}>
            {item.menuList[0]?.optionList.map((option: any) => (
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
            <button type='button' onClick={handleAcceptClick}>
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

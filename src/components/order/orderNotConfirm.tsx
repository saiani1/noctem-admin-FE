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
import { tokenState } from '../../store/store/auth';
import { IList } from '../../types/order.d';

const cx = classNames.bind(styles);

function orderNotConfirm({
  item,
  handleOpenOrderList,
  setOrderConfirm,
  setCompletion,
  componentType,
}: {
  item: IList;
  handleOpenOrderList: (componentTypeArg: string, purchaseId: number) => void;
  setOrderConfirm: React.Dispatch<React.SetStateAction<IList[]>>;
  setCompletion: React.Dispatch<React.SetStateAction<IList[]>>;
  componentType: string;
}) {
  const token = useRecoilValue(tokenState);

  const handleAcceptClick = (e: any) => {
    e.stopPropagation();
    swal({
      text: '음료 제조가 완료되었습니까?',
      buttons: ['취소', '완료'],
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
      onClick={() => handleOpenOrderList(componentType, item.index)}
      onKeyDown={() => handleOpenOrderList(componentType, item.index)}
    >
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
            <li>{item.menuList[0]?.cupType}</li>
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
          {componentType === 'confirm' && (
            <button type='button' onClick={handleAcceptClick}>
              완료
            </button>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}

export default orderNotConfirm;

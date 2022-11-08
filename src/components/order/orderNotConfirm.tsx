import React from 'react';
import classNames from 'classnames/bind';
import swal from 'sweetalert';
import { useRecoilValue } from 'recoil';
import styles from '../../../styles/ui/orderStatusBox.module.scss';
import {
  patchOrderCompleted,
  getConfirm,
  getCompletion,
} from '../../store/api/order';
import { tokenState } from '../../store/atom/auth';
import { IList, IOptionList } from '../../types/order.d';

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

  const handleAcceptClick = (e: React.MouseEvent<HTMLElement>) => {
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
      }
    });
  };

  return (
    <li
      className={cx('complete-card')}
      role='presentation'
      onClick={() => handleOpenOrderList(componentType, item.index)}
      onKeyDown={() => handleOpenOrderList(componentType, item.index)}
    >
      <div className={cx('drink-title')}>
        {item.orderTotalQty === 1 ? (
          <span>
            {' '}
            ( {item.orderNumber} ) <strong>{item.menuList[0]?.menuName}</strong>
          </span>
        ) : (
          <span>
            {' '}
            ( {item.orderNumber} ){' '}
            <strong>
              {item.menuList[0]?.menuName} 외 {item.orderTotalQty}개
            </strong>
          </span>
        )}
      </div>
      <div className={cx('drink-detail')}>
        <span className={cx('option-title')}>옵션</span>
        <ul className={cx('option-list')}>
          {item.menuList[0]?.optionList.map((option: IOptionList) => (
            <li key={option.index}>{option.personalOptionNameAndAmount}</li>
          ))}
          <li>{item.menuList[0]?.cupType}</li>
        </ul>
      </div>
      <div className={cx('etc')}>
        <div className={cx('option-wrap')}>
          <dl>
            <dt>고객명</dt>
            <dd>{item.userNickname}</dd>
          </dl>
          <dl>
            <dt>주문시간</dt>
            <dd>{item.orderRequestTime}</dd>
          </dl>
        </div>
        {componentType === 'confirm' && (
          <button type='button' onClick={handleAcceptClick}>
            완료
          </button>
        )}
      </div>
    </li>
  );
}

export default orderNotConfirm;

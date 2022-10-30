import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/orderStatusBox.module.scss';
import { IList } from '../../types/order.d';
import OrderNotConfirm from '../order/orderNotConfirm';

const cx = classNames.bind(styles);

interface IProps {
  title: string;
  data: IList;
  componentType: string;
  handleOpenOrderList: (componentTypeArg: string, purchaseId: number) => void;
  setOrderConfirm: React.Dispatch<React.SetStateAction<IList[]>>;
  setCompletion: React.Dispatch<React.SetStateAction<IList[]>>;
}

function orderStatusBox({
  title,
  data,
  componentType,
  handleOpenOrderList,
  setOrderConfirm,
  setCompletion,
}: {
  title: string;
  data: IList[];
  componentType: string;
  handleOpenOrderList: (componentTypeArg: string, purchaseId: number) => void;
  setOrderConfirm: React.Dispatch<React.SetStateAction<IList[]>>;
  setCompletion: React.Dispatch<React.SetStateAction<IList[]>>;
}) {
  return (
    <li className={cx('wrap')}>
      <div className={cx('title')}>{title}</div>
      <ul className={cx('order-wrap')}>
        {data.length >= 1 ? (
          data.map(item => (
            <OrderNotConfirm
              key={item.index}
              item={item}
              handleOpenOrderList={handleOpenOrderList}
              setOrderConfirm={setOrderConfirm}
              setCompletion={setCompletion}
              componentType={componentType}
            />
          ))
        ) : (
          <li className={cx('data-none')}>
            {title === '주문 요청' && `현재 ${title}이 없습니다`}
            {title === '제조 중' && '현재 진행중인 메뉴가 없습니다'}
            {title === '제조 완료' && '제조 완료된 메뉴가 없습니다'}
          </li>
        )}
      </ul>
    </li>
  );
}

export default orderStatusBox;

import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/pages/order.module.scss';
import OrderListContent from '../order/orderListContent';
import { IList } from '../../types/order.d';

const cx = classNames.bind(styles);

interface IProps {
  data: IList[];
  orderPurchaseId: number;
  onClick: () => void;
}

function orderInfoPopUp({ data, orderPurchaseId, onClick }: IProps) {
  return (
    <div className={cx('open-order-list')}>
      <div
        role='presentation'
        className={cx('black-background')}
        onClick={onClick}
        onKeyDown={onClick}
      />
      <div className={cx('order-list-content')}>
        <div className={cx('title')}>
          <h2>주문 상세 정보</h2>
          <span>총 {data[orderPurchaseId].orderTotalQty}잔</span>
        </div>
        <ul className={cx('item-list')}>
          {data[orderPurchaseId].menuList.map(product => (
            <OrderListContent product={product} key={product.index} />
          ))}
        </ul>
        <div className={cx('order-info')}>
          <dl>
            <dt>고객명:</dt>
            <dd>{data[orderPurchaseId].userNickname}</dd>
          </dl>
          <dl>
            <dt> 주문시간:</dt>
            <dd>{data[orderPurchaseId].orderRequestTime}</dd>
          </dl>
        </div>
        <div className={cx('button-box')}>
          <button type='button' onClick={onClick}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default orderInfoPopUp;

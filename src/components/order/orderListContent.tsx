import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/pages/order.module.scss';
import { IMenuList } from '../../../public/assets/datas/requestList';

const cx = classNames.bind(styles);

function orderListContent({ product }: { product: IMenuList }) {
  return (
    <div className={cx('item')}>
      {product.qty === 1 ? (
        <div>{product.menuName}</div>
      ) : (
        <div>
          {product.menuName} {product.qty}잔
        </div>
      )}

      <ul>
        {product.optionList.map(item => (
          <li key={item.index}>{item.personalOptionNameAndAmount}</li>
        ))}
      </ul>
    </div>
  );
}

export default orderListContent;

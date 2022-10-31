import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/pages/order.module.scss';
import { IMenuList } from '../../types/order.d';

const cx = classNames.bind(styles);

function orderListContent({ product }: { product: IMenuList }) {
  return (
    <li className={cx('item')}>
      {product.qty === 1 ? (
        <div>
          {product.index + 1}. <strong>{product.menuName}</strong>
        </div>
      ) : (
        <div>
          {product.index + 1}.{' '}
          <strong>
            {product.menuName + 1} {product.qty}잔
          </strong>
        </div>
      )}

      <ul>
        {product.optionList.map(item => (
          <li key={item.index}>{item.personalOptionNameAndAmount}</li>
        ))}
        <li>{product.cupType}</li>
      </ul>
    </li>
  );
}

export default orderListContent;

import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/pages/order.module.scss';
import { IMenuList } from '../../../public/assets/datas/requestList';

const cx = classNames.bind(styles);

function orderListContent({ product }: { product: IMenuList }) {
  // console.log('도달', itemList);
  return (
    <div className={cx('item')}>
      <div>{product.menuName}</div>
      <ul>
        {product.optionList.map(item => (
          <li key={item.index}>{item.personalOptionNameAndAmount}</li>
        ))}
      </ul>
    </div>
  );
}

export default orderListContent;

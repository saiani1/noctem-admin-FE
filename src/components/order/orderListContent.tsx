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
      <div>
        ICED | Tall | 매장컵 | 에스프레소 샷 1 | 물 많이 | 얼음 적게 | 일반휘핑
        많이 | 초콜릿 드리즐
      </div>
    </div>
  );
}

export default orderListContent;

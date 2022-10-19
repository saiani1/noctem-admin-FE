import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/pages/order.module.scss';
import OrderNotConfirm from '../order/orderNotConfirm';
import { IList, requestList } from '../../../public/assets/datas/requestList';
import {
  getRequest,
  getConfirm,
  getCompletion,
} from '../../../pages/api/order';
import OrderListContent from '../order/orderListContent';

const cx = classNames.bind(styles);

function orderContent() {
  // request = 0 : 없음 request = 1 : 있음
  // const request = 1;
  const [openOrderList, setOpenOrderList] = useState(false);
  // 주문 요청
  const [request, setRequest] = useState<IList[]>([]);
  const [menuList, setMenuList] = useState();
  // 주문 확인
  const [orderConfirm, setOrderConfirm] = useState<IList[]>([]);
  // 제조 완료
  const [completion, setCompletion] = useState<IList[]>([]);
  const [orderPurchaseId, setOrderPurchaseId] = useState(0);
  const confirm = 1;
  const complete = 1;
  useEffect(() => {
    getRequest().then(res => {
      console.log('주문 요청', res.data.data);
      setRequest(res.data.data);
      console.log('menuList', request);
    });
    getConfirm().then(res => {
      console.log('주문 확인', res.data.data);
      setOrderConfirm(res.data.data);
    });
    getCompletion().then(res => {
      console.log('제조 완료', res.data.data);
      setCompletion(res.data.data);
    });
  }, []);
  const handleOpenOrderList = () => {
    setOpenOrderList(!openOrderList);
    console.log(orderPurchaseId);
  };
  return (
    <>
      <div className={cx('back-ground')} />
      <div className={cx('order-management')}>
        <div className={cx('category-title')}>주문관리</div>
        {request.length >= 1 ? (
          <div className={cx('order-detail')}>
            <div className={cx('drink-info')}>
              <div className={cx('drink-img')}>
                <img src='assets/images/jpg/store.jpg' alt='' />
              </div>
              <div className={cx('drink-detail-box')}>
                <div className={cx('drink-title')}>
                  아이스 블랙 그레이즈드 라데ICE
                </div>
                <div className={cx('drink-detail')}>
                  ICED|Tall|매장컵|에스프레소 샷1|물 많이|얼음 적게|일반휘핑
                  많이|초콜릿 드리즐
                </div>
                <div className={cx('gray')}>
                  <div>고객명</div>
                  <div>닉네임</div>
                </div>
                <div className={cx('gray')}>
                  <div>주문시간</div>
                  <div>
                    <div>15:14:30</div>
                    <div>5분전</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('button-space')}>
              <div>
                <div className={cx('accept')}>주문 수락</div>
                <div className={cx('refusal')}>주문 반려(재고 부족)</div>
              </div>
            </div>
          </div>
        ) : (
          <div className={cx('data-none')}>현재 주문 요청이 없습니다</div>
        )}
      </div>
      <div className={cx('order-state')}>
        <div className={cx('order-request')}>
          <div className={cx('title')}>주문 요청</div>
          <hr />
          {request.length >= 1 ? (
            request.map(item => (
              <OrderNotConfirm
                item={item}
                key={item.index}
                setOpenOrderList={setOpenOrderList}
                openOrderList={openOrderList}
                setMenuList={setMenuList}
                orderPurchaseId={orderPurchaseId}
                setOrderPurchaseId={setOrderPurchaseId}
              />
            ))
          ) : (
            <div className={cx('data-none')}>현재 주문 요청이 없습니다</div>
          )}
        </div>

        <div className={cx('order-confirm')}>
          <div className={cx('title')}>주문 확인</div>
          <hr />
          {orderConfirm.length >= 1 ? (
            orderConfirm.map(item => (
              <OrderNotConfirm
                item={item}
                key={item.index}
                setOpenOrderList={setOpenOrderList}
                openOrderList={openOrderList}
                setMenuList={setMenuList}
                orderPurchaseId={orderPurchaseId}
                setOrderPurchaseId={setOrderPurchaseId}
              />
            ))
          ) : (
            <div className={cx('data-none')}>현재 진행중인 메뉴가 없습니다</div>
          )}
        </div>

        <div className={cx('order-conplete')}>
          <div className={cx('title')}>제조 완료</div>
          <hr />
          {completion.length >= 1 ? (
            completion.map(item => (
              <OrderNotConfirm
                item={item}
                key={item.index}
                setOpenOrderList={setOpenOrderList}
                openOrderList={openOrderList}
                setMenuList={setMenuList}
                orderPurchaseId={orderPurchaseId}
                setOrderPurchaseId={setOrderPurchaseId}
              />
            ))
          ) : (
            <div className={cx('data-none')}>제조 완료된 메뉴가 없습니다</div>
          )}
        </div>
      </div>
      {openOrderList && (
        <div className={cx('open-order-list')}>
          <div
            role='presentation'
            className={cx('black-background')}
            onClick={handleOpenOrderList}
            onKeyDown={handleOpenOrderList}
          />
          <div className={cx('order-list-content')}>
            <div className={cx('title-content')}>
              <div className={cx('title')}>
                <h2>주문 상세 정보</h2>
                <p>총 {request[orderPurchaseId].orderTotalQty}잔</p>
              </div>
              <div className={cx('order-info')}>
                <div>
                  <div>주문 고객 닉네임</div>
                  <p>{request[orderPurchaseId].userNickname}</p>
                </div>
                <div>
                  <div>주문 시각</div>
                  <p>{request[orderPurchaseId].orderRequestTime}</p>
                </div>
              </div>
            </div>
            <div className={cx('item-list')}>
              {request[orderPurchaseId].menuList.map(product => (
                <OrderListContent product={product} key={product.index} />
              ))}
            </div>

            <div className={cx('button-box')}>
              <button type='button' onClick={handleOpenOrderList}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default orderContent;

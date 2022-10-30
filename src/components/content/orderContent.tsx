import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../../../styles/pages/order.module.scss';

import OrderNotConfirm from '../order/orderNotConfirm';
import {
  getRequest,
  getConfirm,
  getCompletion,
  patchOrderAccept,
  patchOrderCancel,
} from '../../store/api/order';
import { getMenuInfo } from '../../store/api/data';
import {
  requestState,
  confirmState,
  completionState,
} from '../../store/store/orderState';
import OrderListContent from '../order/orderListContent';
import { tokenState } from '../../store/store/auth';
import OrderStatusBox from '../ui/orderStatusBox';

const cx = classNames.bind(styles);

function orderContent() {
  const token = useRecoilValue(tokenState);
  const [openRequestOrderList, setRequestOpenOrderList] = useState(false);
  const [openConfirmOpenOrderList, setConfirmOpenOrderList] = useState(false);
  const [openCompletionOrderList, setopenCompletionOrderList] = useState(false);
  // 주문 요청
  const [request, setRequest] = useRecoilState(requestState);
  // 주문 확인
  const [orderConfirm, setOrderConfirm] = useRecoilState(confirmState);
  // 제조 완료
  const [completion, setCompletion] = useRecoilState(completionState);
  const [orderPurchaseId, setOrderPurchaseId] = useState(0);
  const [updateTime, setUpdateTime] = useState(0);
  const [mainImgUrl, setMainImgUrl] = useState('');

  useEffect(() => {
    const setTimer = setTimeout(() => {
      getOrderData();
      setUpdateTime(updateTime + 1);
    }, 3000);

    return () => {
      clearTimeout(setTimer);
    };
  }, [updateTime]);

  useEffect(() => {
    getOrderData();
  }, []);

  const getOrderData = () => {
    getRequest(token).then(res => {
      setRequest(res.data.data);
      if (res.data.data.length !== 0) {
        const { sizeId } = res.data.data[0].menuList[0];
        getMenuInfo(sizeId).then(res1 => {
          setMainImgUrl(res1.data.data.imgUrl);
        });
      }
    });
    getConfirm(token).then(res => {
      setOrderConfirm(res.data.data);
    });
    getCompletion(token).then(res => {
      setCompletion(res.data.data);
    });
  };

  const handleRequestOpenOrderList = () => {
    setRequestOpenOrderList(!openRequestOrderList);
  };
  const handleConfirmOpenOrderList = () => {
    setConfirmOpenOrderList(!openConfirmOpenOrderList);
  };
  const handleCompletionOpenOrderList = () => {
    setopenCompletionOrderList(!openCompletionOrderList);
  };
  const handleGoConfirm = () => {
    toast.success('주문을 수락했습니다.');
    patchOrderAccept(request[0].purchaseId, token).then(res => {
      getRequest(token).then(resRequest => {
        setRequest(resRequest.data.data);
      });
      getConfirm(token).then(resConfirm => {
        setOrderConfirm(resConfirm.data.data);
      });
    });
  };
  const handleOrderCancel = () => {
    toast.success('주문을 반려했습니다.');
    patchOrderCancel(request[0].purchaseId, token).then(res => {
      getRequest(token).then(resRequest => {
        setRequest(resRequest.data.data);
      });
    });
  };

  const handleOpenOrderList = (componentType: string, purchaseId: number) => {
    if (componentType === 'request') {
      setRequestOpenOrderList(!openRequestOrderList);
      setOrderPurchaseId(purchaseId);
    } else if (componentType === 'confirm') {
      setConfirmOpenOrderList(!openConfirmOpenOrderList);
      setOrderPurchaseId(purchaseId);
    }
    if (componentType === 'completion') {
      setopenCompletionOrderList(!openCompletionOrderList);
      setOrderPurchaseId(purchaseId);
    }
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
                <img src={mainImgUrl} alt='상품 이미지' />
              </div>
              <div className={cx('drink-detail-box')}>
                <div className={cx('drink-title')}>
                  <span>( {request[0].orderNumber} )</span>{' '}
                  {request[0].menuList[0].menuName}{' '}
                  {request[0].menuList.length !== 1 &&
                    `외 ${request[0].menuList.length}개`}
                </div>
                <dl>
                  <dt>옵션</dt>
                  <dd>
                    <ul className={cx('drink-detail')}>
                      {request[0].menuList[0].optionList.map(item => (
                        <li key={item.index}>
                          {item.personalOptionNameAndAmount}
                        </li>
                      ))}
                      <li>{request[0].menuList[0].cupType}</li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>고객명</dt>
                  &nbsp;
                  <dd>{request[0].userNickname}</dd>
                </dl>
                <dl>
                  <dt>주문시간</dt>
                  &nbsp;
                  <dd>
                    <span>{request[0].orderRequestTime}</span>
                    &nbsp;
                    <span>( 5분 전 )</span>
                  </dd>
                </dl>
              </div>
            </div>
            <div className={cx('button-space')}>
              <button
                type='button'
                className={cx('refusal')}
                onClick={handleOrderCancel}
              >
                <strong>주문 반려</strong>
              </button>
              <button
                type='button'
                className={cx('accept')}
                onClick={handleGoConfirm}
              >
                <strong>주문 수락</strong>
              </button>
            </div>
          </div>
        ) : (
          <div className={cx('data-none')}>현재 주문 요청이 없습니다</div>
        )}
      </div>
      <ul className={cx('order-state')}>
        <OrderStatusBox
          title='주문 요청'
          data={request}
          componentType='request'
          handleOpenOrderList={handleOpenOrderList}
          setOrderConfirm={setOrderConfirm}
          setCompletion={setCompletion}
        />
        <OrderStatusBox
          title='제조 중'
          data={orderConfirm}
          componentType='confirm'
          handleOpenOrderList={handleOpenOrderList}
          setOrderConfirm={setOrderConfirm}
          setCompletion={setCompletion}
        />
        <OrderStatusBox
          title='제조 완료'
          data={completion}
          componentType='completion'
          handleOpenOrderList={handleOpenOrderList}
          setOrderConfirm={setOrderConfirm}
          setCompletion={setCompletion}
        />
      </ul>
      {openRequestOrderList && (
        <div className={cx('open-order-list')}>
          <div
            role='presentation'
            className={cx('black-background')}
            onClick={handleRequestOpenOrderList}
            onKeyDown={handleRequestOpenOrderList}
          />
          <div className={cx('order-list-content')}>
            <div className={cx('title')}>
              <h2>주문 상세 정보</h2>
              <span>총 {request[orderPurchaseId].orderTotalQty}잔</span>
            </div>
            <ul className={cx('item-list')}>
              {request[orderPurchaseId].menuList.map(product => (
                <OrderListContent product={product} key={product.index} />
              ))}
            </ul>
            <div className={cx('order-info')}>
              <dl>
                <dt>고객명:</dt>
                <dd>{request[orderPurchaseId].userNickname}</dd>
              </dl>
              <dl>
                <dt> 주문시간:</dt>
                <dd>{request[orderPurchaseId].orderRequestTime}</dd>
              </dl>
            </div>
            <div className={cx('button-box')}>
              <button type='button' onClick={handleRequestOpenOrderList}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
      {openConfirmOpenOrderList && (
        <div className={cx('open-order-list')}>
          <div
            role='presentation'
            className={cx('black-background')}
            onClick={handleConfirmOpenOrderList}
            onKeyDown={handleConfirmOpenOrderList}
          />
          <div className={cx('order-list-content')}>
            <div className={cx('title-content')}>
              <div className={cx('title')}>
                <h2>주문 상세 정보</h2>
                <span>총 {orderConfirm[orderPurchaseId].orderTotalQty}잔</span>
              </div>
            </div>
            <div className={cx('item-list')}>
              {orderConfirm[orderPurchaseId].menuList.map(product => (
                <OrderListContent product={product} key={product.index} />
              ))}
            </div>
            <div className={cx('order-info')}>
              <dl>
                <dt>고객명:</dt>
                <dd>{request[orderPurchaseId].userNickname}</dd>
              </dl>
              <dl>
                <dt> 주문시간:</dt>
                <dd>{request[orderPurchaseId].orderRequestTime}</dd>
              </dl>
            </div>

            <button type='button' onClick={handleConfirmOpenOrderList}>
              닫기
            </button>
          </div>
        </div>
      )}
      {openCompletionOrderList && (
        <div className={cx('open-order-list')}>
          <div
            role='presentation'
            className={cx('black-background')}
            onClick={handleCompletionOpenOrderList}
            onKeyDown={handleCompletionOpenOrderList}
          />
          <div className={cx('order-list-content')}>
            <div className={cx('title-content')}>
              <div className={cx('title')}>
                <h2>주문 상세 정보</h2>
                <span>총 {completion[orderPurchaseId].orderTotalQty}잔</span>
              </div>
            </div>
            <div className={cx('item-list')}>
              {completion[orderPurchaseId].menuList.map(product => (
                <OrderListContent product={product} key={product.index} />
              ))}
            </div>
            <div className={cx('order-info')}>
              <dl>
                <dt>고객명:</dt>
                <dd>{request[orderPurchaseId].userNickname}</dd>
              </dl>
              <dl>
                <dt> 주문시간:</dt>
                <dd>{request[orderPurchaseId].orderRequestTime}</dd>
              </dl>
            </div>

            <div className={cx('button-box')}>
              <button type='button' onClick={handleCompletionOpenOrderList}>
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

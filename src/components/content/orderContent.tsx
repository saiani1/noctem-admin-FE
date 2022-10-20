import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/pages/order.module.scss';
import OrderNotConfirm from '../order/orderNotConfirm';
import { IList } from '../../../public/assets/datas/requestList';
import {
  getRequest,
  getConfirm,
  getCompletion,
  patchOrderAccept,
} from '../../../pages/api/order';
import OrderListContent from '../order/orderListContent';

const cx = classNames.bind(styles);

function orderContent() {
  const [openRequestOrderList, setRequestOpenOrderList] = useState(false);
  const [openConfirmOpenOrderList, setConfirmOpenOrderList] = useState(false);
  const [openCompletionOrderList, setopenCompletionOrderList] = useState(false);
  // 주문 요청
  const [request, setRequest] = useState<IList[]>([]);
  const [menuList, setMenuList] = useState();
  // 주문 확인
  const [orderConfirm, setOrderConfirm] = useState<IList[]>([]);
  // 제조 완료
  const [completion, setCompletion] = useState<IList[]>([]);
  const [orderPurchaseId, setOrderPurchaseId] = useState(0);
  const [modalState, setModalState] = useState('주문 요청');
  useEffect(() => {
    getRequest().then(res => {
      setRequest(res.data.data);
    });
    getConfirm().then(res => {
      setOrderConfirm(res.data.data);
    });
    getCompletion().then(res => {
      setCompletion(res.data.data);
    });
  }, []);
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
    patchOrderAccept(request[0].purchaseId).then(res => {
      console.log(res.data);
    });

    getRequest().then(res => {
      setRequest(res.data.data);
    });
    getConfirm().then(res => {
      setOrderConfirm(res.data.data);
    });
  };
  const handleOrderCancel = () => {
    console.log('주문 반려');
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
                  {request[0].menuList[0].menuName}
                </div>
                <div className={cx('drink-detail')}>
                  ICED|Tall|매장컵|에스프레소 샷1|물 많이|얼음 적게|일반휘핑
                  많이|초콜릿 드리즐
                </div>
                <div className={cx('gray')}>
                  <div>고객명</div>
                  &nbsp;
                  <div>{request[0].userNickname}</div>
                </div>
                <div className={cx('gray')}>
                  <div>주문시간</div>
                  &nbsp;
                  <div>
                    <div>{request[0].orderRequestTime}</div>
                    &nbsp;
                    <div>5분전</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('button-space')}>
              <div>
                <button
                  type='button'
                  className={cx('accept')}
                  onClick={handleGoConfirm}
                >
                  주문 수락
                </button>
                <button
                  type='button'
                  className={cx('refusal')}
                  onClick={handleOrderCancel}
                >
                  주문 반려(재고 부족)
                </button>
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
                setRequestOpenOrderList={setRequestOpenOrderList}
                setConfirmOpenOrderList={setConfirmOpenOrderList}
                setopenCompletionOrderList={setopenCompletionOrderList}
                openRequestOrderList={openRequestOrderList}
                openConfirmOpenOrderList={openConfirmOpenOrderList}
                openCompletionOrderList={openCompletionOrderList}
                setMenuList={setMenuList}
                setOrderConfirm={setOrderConfirm}
                setCompletion={setCompletion}
                setOrderPurchaseId={setOrderPurchaseId}
                setModalState={setModalState}
                isRequest
                isConfirm={false}
                isCompletion={false}
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
                setRequestOpenOrderList={setRequestOpenOrderList}
                setConfirmOpenOrderList={setConfirmOpenOrderList}
                setopenCompletionOrderList={setopenCompletionOrderList}
                openRequestOrderList={openRequestOrderList}
                openConfirmOpenOrderList={openConfirmOpenOrderList}
                openCompletionOrderList={openCompletionOrderList}
                setMenuList={setMenuList}
                setOrderConfirm={setOrderConfirm}
                setCompletion={setCompletion}
                setOrderPurchaseId={setOrderPurchaseId}
                setModalState={setModalState}
                isRequest={false}
                isConfirm
                isCompletion={false}
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
                setRequestOpenOrderList={setRequestOpenOrderList}
                setConfirmOpenOrderList={setConfirmOpenOrderList}
                setopenCompletionOrderList={setopenCompletionOrderList}
                openRequestOrderList={openRequestOrderList}
                openConfirmOpenOrderList={openConfirmOpenOrderList}
                openCompletionOrderList={openCompletionOrderList}
                setMenuList={setMenuList}
                setOrderConfirm={setOrderConfirm}
                setCompletion={setCompletion}
                setOrderPurchaseId={setOrderPurchaseId}
                setModalState={setModalState}
                isRequest={false}
                isConfirm={false}
                isCompletion
              />
            ))
          ) : (
            <div className={cx('data-none')}>제조 완료된 메뉴가 없습니다</div>
          )}
        </div>
      </div>
      {openRequestOrderList && (
        <div className={cx('open-order-list')}>
          <div
            role='presentation'
            className={cx('black-background')}
            onClick={handleRequestOpenOrderList}
            onKeyDown={handleRequestOpenOrderList}
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
                <p>총 {orderConfirm[orderPurchaseId].orderTotalQty}잔</p>
              </div>
              <div className={cx('order-info')}>
                <div>
                  <div>주문 고객 닉네임</div>
                  <p>{orderConfirm[orderPurchaseId].userNickname}</p>
                </div>
                <div>
                  <div>주문 시각</div>
                  <p>{orderConfirm[orderPurchaseId].orderRequestTime}</p>
                </div>
              </div>
            </div>
            <div className={cx('item-list')}>
              {orderConfirm[orderPurchaseId].menuList.map(product => (
                <OrderListContent product={product} key={product.index} />
              ))}
            </div>

            <div className={cx('button-box')}>
              <button type='button' onClick={handleConfirmOpenOrderList}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
      {openCompletionOrderList && (
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
                <p>총 {completion[orderPurchaseId].orderTotalQty}잔</p>
              </div>
              <div className={cx('order-info')}>
                <div>
                  <div>주문 고객 닉네임</div>
                  <p>{completion[orderPurchaseId].userNickname}</p>
                </div>
                <div>
                  <div>주문 시각</div>
                  <p>{completion[orderPurchaseId].orderRequestTime}</p>
                </div>
              </div>
            </div>
            <div className={cx('item-list')}>
              {completion[orderPurchaseId].menuList.map(product => (
                <OrderListContent product={product} key={product.index} />
              ))}
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

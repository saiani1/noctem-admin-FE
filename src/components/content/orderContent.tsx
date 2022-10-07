import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../../styles/pages/order.module.scss';

const cx = classNames.bind(styles);

function orderContent() {
  // state == 1 : 주문 요청 x state == 2 : 주문 확인 x state == 3 : 제조완료 x state == 4 모두 있음
  const state = 0;
  return (
    <>
      <div className={cx('back-ground')} />
      <div className={cx('order-management')}>
        <div className={cx('category-title')}>주문관리</div>
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
      </div>
      <div className={cx('order-state')}>
        <div className={cx('order-request')}>
          <div className={cx('title')}>주문 요청</div>
          <hr />
          <div className={cx('complete-card')}>
            <div className={cx('drink-title')}>아이스 블랙 그레이즈드 라떼</div>
            <div className={cx('drink-detail')}>
              ICED|Tall|매장컵|에스프레소 샷1|물 많이|얼음 적게|일반휘핑
              많이|초콜릿 드리즐
            </div>
            <div className={cx('nick-name-place')}>
              <div className={cx('nickname')}>닉네임</div>
              <div className={cx('order-time')}>15:14:30</div>
            </div>
          </div>
        </div>
        <div className={cx('order-confirm')}>
          <div className={cx('title')}>주문 확인</div>
          <hr />
          <div className={cx('complete-card')}>
            <div className={cx('drink-title')}>아이스 블랙 그레이즈드 라떼</div>
            <div className={cx('drink-detail')}>
              ICED|Tall|매장컵|에스프레소 샷1|물 많이|얼음 적게|일반휘핑
              많이|초콜릿 드리즐
            </div>
            <div className={cx('nick-name-place')}>
              <div className={cx('nickname')}>닉네임</div>
              <div className={cx('order-time')}>15:14:30</div>
            </div>
            <button className={cx('confirm-button')} type='button'>
              완료
            </button>
          </div>
        </div>
        <div className={cx('order-conplete')}>
          <div className={cx('title')}>제조 완료</div>
          <hr />
          <div className={cx('complete-card')}>
            <div className={cx('drink-title')}>아이스 블랙 그레이즈드 라떼</div>
            <div className={cx('drink-detail')}>
              ICED|Tall|매장컵|에스프레소 샷1|물 많이|얼음 적게|일반휘핑
              많이|초콜릿 드리즐
            </div>
            <div className={cx('nick-name-place')}>
              <div className={cx('nickname')}>닉네임</div>
              <div className={cx('order-time')}>15:14:30</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default orderContent;

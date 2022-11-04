/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { toast, ToastBar, Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
import classNames from 'classnames/bind';

import '../styles/index.scss';
import { useRouter } from 'next/router';
import styles from '../styles/common/app.module.scss';
import MenubarList from '../src/components/common/menubarList';
import Header from '../src/components/common/header';

const cx = classNames.bind(styles);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission(); // 알림 권한 요청
    }

    const STREAM_URL = `https://sse.noctem.click:33333/sse/alert-server/store/1`;
    const ssEvents = new EventSource(STREAM_URL);

    ssEvents.addEventListener('open', event => {
      console.log('sse OPEN', event);
    });

    ssEvents.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      console.log('get message', event);
      console.log('data', data);

      toast.custom(
        t => (
          <div className={cx('toast-wrap')}>
            <div className={cx('message-wrap')}>
              <span className={cx('info')}>
                {data.alertCode === 1
                  ? `새로운 주문(${data.data.orderNumber})이 들어왔습니다.`
                  : '주문을 취소하였습니다.'}
              </span>
              <span className={cx('message')}>{data.message}</span>
            </div>
            <button
              type='button'
              onClick={() => {
                toast.dismiss(t.id);
                router.push('/order');
              }}
              className={cx('btn-close')}
            >
              확인
            </button>
          </div>
        ),
        {
          style: {
            position: 'absolute',
            right: 0,
            top: 0,
            height: '70px',
            overflow: 'hidden',
          },
          duration: Infinity,
          position: 'top-right',
        },
      );
    });

    ssEvents.addEventListener('error', err => {
      console.log('ERR', err);
    });

    return () => {
      ssEvents.close();
    };
  }, []);

  return (
    <RecoilRoot>
      <noscript>You should use javascript</noscript>
      <div style={{ display: 'flex' }}>
        <MenubarList />
        <div className={cx('container')}>
          <Header />
          <Component {...pageProps} />
        </div>
        <div className={cx('toaster-wrap')}>
          <Toaster
            containerStyle={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '60px',
              overflow: 'hidden',
            }}
          >
            {t => (
              <ToastBar
                toast={t}
                style={{
                  ...t.style,
                }}
              />
            )}
          </Toaster>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default MyApp;

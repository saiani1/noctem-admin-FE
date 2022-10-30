/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';

import '../styles/index.scss';
import MenubarList from '../src/components/common/menubarList';
import Header from '../src/components/common/header';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission(); // 알림 권한 요청
    }

    const STREAM_URL = `https://sse.noctem.click:33333/sse/alert-server/store/1`;
    const ssEvents = new EventSource(STREAM_URL);

    ssEvents.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      toast(data.message, {
        icon: '📢',
      });
    });

    ssEvents.addEventListener('error', err => {
      console.log('ERR.', err);
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
        <div>
          <Header />
          <Component {...pageProps} />
        </div>
        <Toaster
          containerStyle={{
            top: 30,
          }}
          toastOptions={{
            duration: 2000,
          }}
        />
      </div>
    </RecoilRoot>
  );
}

export default MyApp;

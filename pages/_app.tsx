/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';

import '../styles/index.scss';
import MenubarList from '../src/components/common/menubarList';
import Header from '../src/components/common/header';

function MyApp({ Component, pageProps }: AppProps) {
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

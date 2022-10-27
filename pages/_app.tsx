/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot, useRecoilValue } from 'recoil';

import '../styles/index.scss';
// import { isExistToken } from '../src/store/utils/token';
import MenubarList from '../src/components/common/menubarList';
import Header from '../src/components/common/header';
import Login from './login';

import { loginState } from '../src/store/store/auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
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

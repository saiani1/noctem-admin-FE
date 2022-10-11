/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import React, { useState } from 'react';

import '../styles/index.scss';
import MenubarList from '../src/common/menubarList';
import Header from '../src/common/header';
import Login from './login';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div style={{ display: 'flex' }}>
      {!isLogin ? (
        <Login />
      ) : (
        <>
          <MenubarList />
          <div>
            <Header />
            <Component {...pageProps} />
          </div>
        </>
      )}
    </div>
  );
}

export default MyApp;

/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';

import '../styles/index.scss';
import { isExistToken } from '../src/store/utils/token';
import MenubarList from '../src/common/menubarList';
import Header from '../src/common/header';
import Login from './login';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(isExistToken);
  }, [isLogin]);

  return (
    <RecoilRoot>
      <div style={{ display: 'flex' }}>
        {!isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <>
            <MenubarList />
            <div>
              <Header setIsLogin={setIsLogin} />
              <Component {...pageProps} />
              <Toaster
                containerStyle={{
                  top: 30,
                }}
                toastOptions={{
                  duration: 2000,
                }}
              />
            </div>
          </>
        )}
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

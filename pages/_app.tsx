/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import React from 'react';

import '../styles/index.scss';
import MenubarList from '../src/common/menubarList';
import Header from '../src/common/header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ display: 'flex' }}>
      <MenubarList />
      <div>
        <Header />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;

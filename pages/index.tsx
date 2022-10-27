/* eslint-disable react/function-component-definition */
import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Login from './login';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Noctem Order</title>
        <meta name='description' content='Noctom Order' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Login />
    </>
  );
};

export default Home;

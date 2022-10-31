/* eslint-disable react/function-component-definition */
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import LoginContent from '../src/components/content/loginContent';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Noctem Order</title>
        <meta name='description' content='Noctom Order' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <LoginContent />
    </>
  );
};

export default Home;

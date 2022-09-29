/* eslint-disable react/function-component-definition */
import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nectem Order</title>
        <meta name='description' content='Nectom Order' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <h1>Hello Noctem!</h1>
      </div>
    </>
  );
};

export default Home;

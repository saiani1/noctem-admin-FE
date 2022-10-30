/* eslint-disable react/function-component-definition */
import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { toast } from 'react-hot-toast';
import Login from './login';

const Home: NextPage = () => {
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

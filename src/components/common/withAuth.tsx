import React from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '../../store/atom/auth';
import { categoryState } from '../../store/atom/category';

const withAuth = (WrappedComponent: any) => {
  // eslint-disable-next-line react/function-component-definition
  return (props: any) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const router = useRouter();
      const isLogin = useRecoilValue(loginState);
      const [, setClickMenu] = useRecoilState(categoryState);

      // If there is no access token we redirect to "/" page.
      if (!isLogin) {
        router.push('/');
        setClickMenu('');
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      // eslint-disable-next-line react/jsx-props-no-spreading
      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;

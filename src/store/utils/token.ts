// 토큰 유무 확인
export const isExistToken = () => {
  if (getToken() !== '{}' && getToken() !== undefined) {
    return true;
  }
  return false;
};

// 토큰 가져오기
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || '{}';
  }
  return '{}';
};

// 토큰 유무 확인 & 가져오기
export const checkToken = () => {
  if (isExistToken()) {
    return getToken();
  }
  return false;
};

// 토큰 저장하기
export const setToken = (token: string) => {
  localStorage.setItem('token', JSON.stringify(token));
};

// 토큰 제거하기
export const removeToken = () => {
  localStorage.removeItem('token');
};

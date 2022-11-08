import axios from 'axios';

// baseurl
export const baseURL = 'https://noctem.click/api';

// 요청
export const basicRequest = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

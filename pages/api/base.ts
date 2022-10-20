import axios from 'axios';

// baseurl
export const baseURL = 'https://noctem.click/api';
// export const baseURL = "http://121.145.206.143:8000/api";

// 요청
export const basicRequest = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

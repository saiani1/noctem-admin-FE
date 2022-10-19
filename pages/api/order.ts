import { getToken } from '../../src/store/utils/token';
import { basicRequest } from './base';

const SERVICE = '/store-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken()),
  },
};

export const getRequest = async () => {
  const res = await basicRequest.get(`${SERVICE}/order/notConfirm`, HEADERS);
  return res;
};

export const getConfirm = async () => {
  const res = await basicRequest.get(`${SERVICE}/order/making`, HEADERS);
  return res;
};

export const getCompletion = async () => {
  const res = await basicRequest.get(`${SERVICE}/order/completed`, HEADERS);
  return res;
};

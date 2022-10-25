import { getToken } from '../utils/token';
import { basicRequest } from './base';

const SERVICE = '/store-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken()),
  },
};

export const getStoreInfo = async () => {
  const res = await basicRequest.get(`${SERVICE}/store/my`, HEADERS);
  return res;
};

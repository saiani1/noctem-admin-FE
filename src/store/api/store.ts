import { basicRequest } from './base';

const SERVICE = '/store-service';

export const getStoreInfo = async (token: string) => {
  const res = await basicRequest.get(`${SERVICE}/store/my`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

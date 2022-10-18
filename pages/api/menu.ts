import { basicRequest } from './base';

const SERVICE = '/menu-service';

export const getSmallCategory = async () => {
  const res = await basicRequest.get(`${SERVICE}/1/categoryS`);
  return res;
};

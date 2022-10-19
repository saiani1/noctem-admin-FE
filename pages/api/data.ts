import { getToken } from '../../src/store/utils/token';
import { basicRequest } from './base';

const M_SERVICE = '/menu-service';
const P_SERVICE = '/purchase-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken()),
  },
};

export const getPopularMenuList = async () => {
  const res = await basicRequest.get(`${P_SERVICE}/statistics/1/popularMenu`);
  return res;
};

export const getMenuInfo = async (sizeId: string | undefined) => {
  const res = await basicRequest.get(
    `${M_SERVICE}/size/menu/forPurchase/${sizeId}/0`,
  );
  return res;
};

export const getCustomerRank = async () => {
  const res = await basicRequest.get(
    `${P_SERVICE}/statistics/customer`,
    HEADERS,
  );
  return res;
};

import { getToken } from '../../src/store/utils/token';
import { basicRequest } from './base';

const M_SERVICE = '/menu-service';
const S_SERVICE = '/store-service';
const HEADERS = {
  headers: {
    Authorization: JSON.parse(getToken()),
  },
};

export const getSmallCategory = async () => {
  const res = await basicRequest.get(`${M_SERVICE}/1/categoryS`);
  return res;
};

export const getMenuList = async (categorySId: string | undefined) => {
  const res = await basicRequest.get(`${M_SERVICE}/admin/menu/${categorySId}`);
  return res;
};

export const getSoldOutMenuList = async () => {
  const res = await basicRequest.get(`${S_SERVICE}/store/1/soldOut`);
  return res;
};

export const addSoldOutMenu = async (menuId: string | undefined) => {
  const res = await basicRequest.patch(
    `${S_SERVICE}/store/soldOut/${menuId}`,
    null,
    HEADERS,
  );
  return res;
};

import { basicRequest } from './base';

const M_SERVICE = '/menu-service';
const P_SERVICE = '/purchase-service';

export const getHourSalesData = async (token: string) => {
  const res = await basicRequest.get(`${P_SERVICE}/statistics/sales/hour`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getDaySalesData = async (token: string) => {
  const res = await basicRequest.get(`${P_SERVICE}/statistics/sales/day`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getMonthSalesData = async (token: string) => {
  const res = await basicRequest.get(`${P_SERVICE}/statistics/sales/month`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
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

export const getCustomerRank = async (token: string) => {
  const res = await basicRequest.get(`${P_SERVICE}/statistics/customer`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

import { getToken } from '../utils/token';
import { basicRequest } from './base';

const SERVICE = '/store-service';
export const HEADERS = {
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

// 주문 수락
export const patchOrderAccept = async (purchaseId: number) => {
  const res = await basicRequest.patch(
    `${SERVICE}/order/${purchaseId}/making`,
    {},
    HEADERS,
  );
  return res;
};

// 주문 반려
export const patchOrderCancel = async (purchaseId: number) => {
  const res = await basicRequest.patch(
    `${SERVICE}/order/store/${purchaseId}/cancel`,
    {},
    HEADERS,
  );
  return res;
};

// 제조 완료
export const patchOrderCompleted = async (purchaseId: number) => {
  const res = await basicRequest.patch(
    `${SERVICE}/order/${purchaseId}/completed`,
    {},
    HEADERS,
  );
  return res;
};

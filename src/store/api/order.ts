import { basicRequest } from './base';

const SERVICE = '/store-service';

export const getRequest = async (token: string) => {
  const res = await basicRequest.get(`${SERVICE}/order/notConfirm`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getConfirm = async (token: string) => {
  const res = await basicRequest.get(`${SERVICE}/order/making`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getCompletion = async (token: string) => {
  const res = await basicRequest.get(`${SERVICE}/order/completed`, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

// 주문 수락
export const patchOrderAccept = async (purchaseId: number, token: string) => {
  const res = await basicRequest.patch(
    `${SERVICE}/order/${purchaseId}/making`,
    {},
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};

// 주문 반려
export const patchOrderCancel = async (purchaseId: number, token: string) => {
  const res = await basicRequest.patch(
    `${SERVICE}/order/store/${purchaseId}/cancel`,
    {},
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};

// 제조 완료
export const patchOrderCompleted = async (
  purchaseId: number,
  token: string,
) => {
  const res = await basicRequest.patch(
    `${SERVICE}/order/${purchaseId}/completed`,
    {},
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};

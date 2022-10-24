import { basicRequest } from './base';

const SERVICE = '/store-service';

export const storeLogin = async (
  loginId: string | undefined,
  password: string | undefined,
) => {
  const res = await basicRequest.post(`${SERVICE}/login`, {
    loginId,
    password,
  });
  return res;
};

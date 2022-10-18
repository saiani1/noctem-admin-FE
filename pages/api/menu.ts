import { basicRequest } from './base';

const SERVICE = '/menu-service';

export const getSmallCategory = async () => {
  const res = await basicRequest.get(`${SERVICE}/1/categoryS`);
  return res;
};

export const getMenuList = async (categorySId: string | undefined) => {
  const res = await basicRequest.get(`${SERVICE}/admin/menu/${categorySId}`);
  return res;
};

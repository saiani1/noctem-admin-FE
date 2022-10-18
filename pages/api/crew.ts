import { basicRequest } from './base';

const SERVICE = '/admin-service';

export const getCrewList = async () => {
  const res = await basicRequest.get(`${SERVICE}/employee/roleAsc`);
  return res;
};

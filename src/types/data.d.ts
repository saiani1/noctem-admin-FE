export interface IMenuList {
  index: string;
  rank: number;
  sizeId: string;
  totalCount: number;
}

export interface IMenuInfo {
  cartId: string;
  menuFullName: string;
  menuShortName: string;
  menuTotalPrice: number;
}

export interface ICustomerInfo {
  index: string;
  rank: number;
  age: number;
  sex: string;
  totalVisitCount: string;
}

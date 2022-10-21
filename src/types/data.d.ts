export interface IMenuList {
  index: string;
  rank: number;
  sizeId: string;
  totalCount: number;
}

export interface IMenuInfo {
  cartId: number;
  menuFullName: string;
  menuShortName: string;
  menuTotalPrice: number;
  imgUrl: string;
}

export interface ICustomerInfo {
  index: string;
  rank: number;
  age: number;
  sex: string;
  totalVisitCount: string;
}

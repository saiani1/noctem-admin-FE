export interface ISalesData {
  totalSales: number;
  totalCount: number;
  performanceSales: number;
  performanceCount: number;
  beforeStatistics: IDetailSalesData[];
  recentStatistics: IDetailSalesData[];
}

export interface IDetailSalesData {
  index: number;
  stringHour: string;
  stringDay: string;
  stringMonth: string;
  sales: number;
}

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

export interface IUserRankInfo {
  index: number;
  rank: number;
  nickname: string;
  grade: string;
  gradeAccumulateExp: number;
}

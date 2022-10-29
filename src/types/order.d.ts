export interface IList {
  index: number;
  purchaseId: number;
  orderTotalQty: number;
  menuList: IMenuList[];
  userNickname: string;
  orderNumber: number;
  orderRequestTime: string;
}

export interface IMenuList {
  index: number;
  sizeId: number;
  menuName: string;
  cupType: string;
  qty: number;
  optionList: IOptionList[];
}

export interface IOptionList {
  index: number; // 0: 온도, 1: 사이즈
  personalOptionNameAndAmount: string;
}

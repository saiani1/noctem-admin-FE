interface IList {
  index: number;
  purchaseId: number;
  orderTotalQty: number;
  menuList: IMenuList[];
  userNickname: string;
  orderNumber: number;
  orderRequestTime: string;
}

interface IMenuList {
  index: number;
  sizeId: number;
  menuName: string;
  qty: number;
  optionList: IOptionList[];
}

interface IOptionList {
  index: number;
  personalOptionNameAndAmount: string;
}

export const requestList: Array<IList> = [
  {
    index: 0,
    purchaseId: 31,
    orderTotalQty: 2,
    menuList: [
      {
        index: 0,
        sizeId: 1,
        menuName: '딸기 아사이 레모네이드 녹템 리프레셔',
        qty: 1,
        optionList: [
          {
            index: 0,
            personalOptionNameAndAmount: 'ICED',
          },
          {
            index: 1,
            personalOptionNameAndAmount: 'Tall',
          },
        ],
      },
      {
        index: 1,
        sizeId: 2,
        menuName: '할로윈 초코 헤이즐넛 프라푸치노',
        qty: 2,
        optionList: [
          {
            index: 0,
            personalOptionNameAndAmount: 'ICED',
          },
          {
            index: 1,
            personalOptionNameAndAmount: 'Grande',
          },
        ],
      },
    ],
    userNickname: '차누링',
    orderNumber: 23,
    orderRequestTime: '13:52:39',
  },
  {
    index: 1,
    purchaseId: 32,
    orderTotalQty: 2,
    menuList: [
      {
        index: 0,
        sizeId: 1,
        menuName: '아이스 카페 아메리카노',
        qty: 1,
        optionList: [
          {
            index: 0,
            personalOptionNameAndAmount: 'ICED',
          },
          {
            index: 1,
            personalOptionNameAndAmount: 'Tall',
          },
        ],
      },
      {
        index: 1,
        sizeId: 2,
        menuName: '딸기 아사이 레모네이드 녹템 리프레셔',
        qty: 2,
        optionList: [
          {
            index: 0,
            personalOptionNameAndAmount: 'ICED',
          },
          {
            index: 1,
            personalOptionNameAndAmount: 'Grande',
          },
        ],
      },
    ],
    userNickname: '수아수아',
    orderNumber: 24,
    orderRequestTime: '13:52:54',
  },
];

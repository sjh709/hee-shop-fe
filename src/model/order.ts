export type ShipInfoType = {
  firstName: string;
  lastName: string;
  contact: string;
  address1: string;
  address2: string;
  zip: string;
};

export type CardValueType = {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: string;
};

export type CreateOrderPropsType = {
  totalPrice: number;
  shipTo: ShipToType;
  contact: ContactType;
  orderList: OrderListType[];
};

export type ShipToType = {
  address1: string;
  address2: string;
  zip: string;
};

export type ContactType = {
  firstName: string;
  lastName: string;
  contact: string;
};

export type OrderListType = {
  productId: string;
  price: number;
  qty: number;
  size: string;
};

export type GetOrderType = {
  createdAt: string;
  items: GetOrderItemType[];
  orderNum: string;
  status: string;
  totalPrice: number;
  userId: string;
  _id: string;
};

export type GetOrderItemType = {
  price: number;
  productId: {
    image: string;
    name: string;
    _id: string;
  };
  qty: number;
  size: string;
  _id: string;
};

export type BadgeBgType = {
  [index: string]: string;
  preparing: string;
  shipping: string;
  refund: string;
  delivered: string;
};

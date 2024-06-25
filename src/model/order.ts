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

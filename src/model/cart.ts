export type CartListType = {
  productId: CartProductType;
  qty: number;
  size: string;
  _id: string;
};

export type CartProductType = {
  category: string[];
  createdAt: string;
  description: string;
  image: string;
  isDeleted: boolean;
  name: string;
  price: number;
  sku: string;
  status: string;
  stock: CartStockType;
  __v: number;
  _id: string;
};

export type CartStockType = {
  xs?: number;
  s?: number;
  m?: number;
  l?: number;
  xl?: number;
};

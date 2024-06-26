export type ProductType = {
  name: string;
  sku: string;
  stock: StockType | {};
  image: string;
  description: string;
  category: string[];
  status: string;
  price: string | number;
};

export type StockType = {
  xs?: number;
  s?: number;
  m?: number;
  l?: number;
  xl?: number;
};

export type CreateProductType = {
  formData: ProductType;
};

export type ProductListType = {
  category: string[];
  description: string;
  image: string;
  isDeleted: boolean;
  name: string;
  price: number;
  sku: string;
  status: string;
  stock: any;
  _id: string;
};

export type EditProductType = {
  category: string[];
  description: string;
  image: string;
  isDeleted?: boolean;
  name: string;
  price: number | string;
  sku: string;
  status: string;
  stock: {};
  _id?: string;
};

export type SearchQueryType = {
  page: string;
  name?: string;
  orderNum?: string;
};

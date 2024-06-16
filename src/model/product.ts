export type ProductType = {
  name: string;
  sku: string;
  stock: StockType | {};
  image: string;
  description: string;
  category: string[];
  status: string;
  price: string;
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

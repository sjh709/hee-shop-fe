export type ProductType = {
  name: string;
  sku: string;
  stock: StockType | {};
  image: string;
  description: string;
  category: string[];
  status: string;
  price: number;
};

export type StockType = {
  size: number;
};

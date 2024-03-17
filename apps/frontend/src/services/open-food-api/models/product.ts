export interface OpenFoodProduct {
  code: string;
  product: OpenFoodProductDetails;
}

export interface OpenFoodProductDetails {
  brands: string;
  product_name: string;
}
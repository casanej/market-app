export interface OpenFoodProduct {
  code: string;
  product: OpenFoodProductDetails;
  status: number;
  status_verbose: string;
}

export interface OpenFoodProductDetails {
  brands: string;
  image_url: string;
  product_name: string;
  quantity: string;
}
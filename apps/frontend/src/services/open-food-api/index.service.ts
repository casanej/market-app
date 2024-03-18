/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, Method } from "axios";
import { OpenFoodProduct } from "./models";

class OpenFoodFactsApiService {
  private instance: AxiosInstance = axios.create({
    baseURL: 'https://world.openfoodfacts.org/api/v2',
  });

  async makeRequest<ResponseData = any, RequestPayload = any>(method: Method, url: string, payload?: RequestPayload): Promise<ResponseData> {
    const request = await this.instance.request<ResponseData>({
      method,
      url,
      data: method !== 'GET' ? payload : undefined,
      params: method === 'GET' ? payload : undefined,
    });

    return request.data;
  }

  async getProduct(id: string) {
    return await this.makeRequest<OpenFoodProduct>('GET', `/product/${id}.json`);
  }
}

export const openFoodFactsApiService = new OpenFoodFactsApiService();
import axios, { AxiosInstance, AxiosResponse, Method } from "axios";
import { MAPProductResponseDto } from "market-app-bff-models";

class MarketAppBackend {
  private instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 3000,
  })

  async makeCall<IPayload = any, IResponse = any>(method: Method, url: string, payload?: IPayload): Promise<AxiosResponse<IResponse>> {
    return this.instance<IResponse, any, IPayload>({
      method,
      url,
      params: method === 'GET' ? payload : undefined,
      data: method === 'POST' ? payload : undefined,
    })
  }

  async getProduct(barcode: string) {
    const { data } = await this.makeCall<null, MAPProductResponseDto>('GET', `product/${barcode}`);

    return data;
  }
}

export const marketAppBackend = new MarketAppBackend();
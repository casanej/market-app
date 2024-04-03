import axios, { AxiosInstance, AxiosResponse, Method } from "axios";
import { GetListsDto, MAPProductResponseDto } from "market-app-bff-models";

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

  setToken(token: string) {
    this.instance.defaults.headers.common.Authorization = token;
  }

  async getLists() {
    const { data } = await this.makeCall<null, GetListsDto[]>('GET', 'list');

    return data;
  }

  async getProduct(barcode: string) {
    const { data } = await this.makeCall<null, MAPProductResponseDto>('GET', `product/${barcode}`);

    return data;
  }
}

export const marketAppBackend = new MarketAppBackend();
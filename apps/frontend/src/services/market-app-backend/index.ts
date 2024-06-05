import axios, { AxiosInstance, AxiosResponse, Method } from "axios";
import { AuthLoginRequest, AuthLoginResponse, MAPProductRequestDto, MAPProductResponseDto, RequestPaginatedListsDto, ResponsePaginatedListsDto } from "market-app-bff-models";
import { LC_NAMES } from "../../constants/local-storage";

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

  async doLogin(email: string, password: string): Promise<true | string> {
    try {
      const { data } = await this.makeCall<AuthLoginRequest, AuthLoginResponse>('POST', 'auth/login', { email, password });

      const token = `Bearer ${data.accessToken}`;

      this.setToken(token);
      localStorage.setItem(LC_NAMES.AUTH_TOKEN, token);

      return true;
    } catch (error) {
      console.error('[LOGIN ERROR]', error);

      throw Error('Cannot login with provided credentials.');
    }
  }

  async doRegisterProduct(payload: MAPProductRequestDto) {
    const { data } = await this.makeCall('POST', 'product', payload);

    return data;
  }

  async getLists(page: number, pageSize: number) {
    const { data } = await this.makeCall<RequestPaginatedListsDto, ResponsePaginatedListsDto<MAPProductResponseDto>>('GET', 'product', { page, pageSize });

    return data;
  }

  async getProduct(barcode: string) {
    const { data } = await this.makeCall<null, MAPProductResponseDto>('GET', `product/${barcode}`);

    return data;
  }
}

export const marketAppBackend = new MarketAppBackend();
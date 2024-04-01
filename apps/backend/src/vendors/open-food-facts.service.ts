import { Injectable } from '@nestjs/common';
import { OpenFoodProduct } from 'market-app-bff-models';
import { Method } from 'src/common/models/request';

@Injectable()
export class OpenFoodFactsService {
  private BASE_URL = 'https://world.openfoodfacts.org/api/v2';

  private async makeCall<IResponse = any, IPayload = any,>(method: Method, path: string, payload?: IPayload): Promise<IResponse> {

    const params = new URLSearchParams(payload as Record<string, string>);
    const url = `${this.BASE_URL}/${path}` + (method === 'GET' ? `?${params}` : '');

    const request = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method !== 'GET' ? JSON.stringify(payload) : undefined,
    });

    return request.json();
  }

  async getProduct(barcode: string) {
    return this.makeCall<OpenFoodProduct>('GET', `/product/${barcode}.json`);
  }
}

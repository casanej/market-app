import { FC } from 'react';
import * as S from './index.style';
import { ProductItemListProps } from './index.type';
import { moneyFormat } from '../../../utils';


export const ProductItemList: FC<ProductItemListProps> = ({ code, name, quantity, value }) => {

  return <S.ProductItemList>
    <div>
      <h1>{name}</h1>
      <label>{code}</label>
    </div>
    <div>
      <span>{quantity} / {moneyFormat(value)} = {moneyFormat(value * quantity).toString().padStart(name.length)}</span>
    </div>
  </S.ProductItemList>;
};

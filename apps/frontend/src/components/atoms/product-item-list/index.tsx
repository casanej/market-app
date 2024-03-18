import { FC, useMemo } from 'react';
import * as S from './index.style';
import { ProductItemListProps } from './index.type';
import { moneyFormat, percentageFormat } from '../../../utils';


export const ProductItemList: FC<ProductItemListProps> = ({ code, lastPrice, name, quantity, value }) => {

  const renderLastPrice = useMemo(() => {
    if (!lastPrice) return <label>Sem informações de histórico de preço.</label>;

    const isCheaper = value <= lastPrice;

    let message = `Não houve alteração no preço.`;

    if (lastPrice !== value) {
      message = `Último preço: ${moneyFormat(lastPrice)}. ${isCheaper ? 'BARATEOU' : 'ENCARECEU'} ${moneyFormat(Math.abs(lastPrice - value))} (${percentageFormat(lastPrice, value, true, true)})`;
    }

    const textColor = isCheaper ? 'text-green-500' : 'text-red-500';


    return <label className={`${textColor}`}>{message}</label>;
  }, [lastPrice, value]);

  return <S.ProductItemList>
    <div>
      <h1>{name}</h1>
      <label>{code}</label>
    </div>
    <div>
      <span>{quantity} * {moneyFormat(value)} = {moneyFormat(value * quantity).toString().padStart(name.length)}</span>
    </div>
    {renderLastPrice}
  </S.ProductItemList>;
};

import { FC, useMemo } from 'react';
import { ProductItemListProps } from './index.type';
import { moneyFormat, percentageFormat } from '../../../utils';
import { Button } from '..';


export const ProductItemList: FC<ProductItemListProps> = ({ code, lastPrice, name, onRemove, quantity, price }) => {

  const renderLastPrice = useMemo(() => {
    if (!lastPrice) return <label>Sem informações de histórico de preço.</label>;

    const isCheaper = price <= lastPrice;

    let message = `Não houve alteração no preço.`;

    if (lastPrice !== price) {
      message = `Último preço: ${moneyFormat(lastPrice)}. ${isCheaper ? 'BARATEOU' : 'ENCARECEU'} ${moneyFormat(Math.abs(lastPrice - price))} (${percentageFormat(lastPrice, price, true, true)})`;
    }

    const textColor = isCheaper ? 'text-green-500' : 'text-red-500';


    return <label className={`${textColor}`}>{message}</label>;
  }, [lastPrice, price]);

  return <div className='p-3 border border-solid border-gray-400 rounded flex flex-row gap-4 space-x-2'>
    <div className=' flex flex-col gap-2'>
      <div className='flex flex-row gap-2 items-end' >
        <h1 className='font-bold text-lg'>{name}</h1>
        <label className='text-sm'>{code}</label>
      </div>
      <div>
        <span>{quantity} * {moneyFormat(price)} = {moneyFormat(price * quantity).toString().padStart(name.length)}</span>
      </div>
      <div>
        {renderLastPrice}
      </div>
    </div >
    <div>
      <Button onClick={() => onRemove(code)}>Delete</Button>
    </div>
  </div>;
};

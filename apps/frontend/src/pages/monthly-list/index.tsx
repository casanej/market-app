import { useMutation } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { MonthlyListPageProps } from './index.type';
import * as S from './index.style';
import { monthlyListService } from '../../services/monthly-list/monthly-list.service';
import { moneyFormat } from '../../utils';
import { BarcodeReader } from '../../components/organism';
import { openFoodFactsApiService } from '../../services';
import { ProductItemList } from '../../components/atoms';


const MonthlyListPageWrapped = observer(({ service }: MonthlyListPageProps) => {
  const [barcode, setBarcode] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);


  const { mutate: mutationProductCodeBar } = useMutation({
    mutationFn: (barcode: string) => openFoodFactsApiService.getProduct(barcode),
    onSuccess: (data) => {
      setProductName(`${data.product.brands} - ${data.product.product_name}`);
    },
    onError: () => {
      setProductName('Produto não encontrado');
    },

  });

  useEffect(() => {
    if (barcode && barcode.length === 13) {
      mutationProductCodeBar(barcode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcode]);

  const handleAddItem = () => {
    service.addItem(barcode, productName, amount, quantity);
    setBarcode('');
    setAmount(0);
  };

  return <S.MonthlyList className='container'>
    <h1>Total: {moneyFormat(service.total)}</h1>
    <div>
      <div>
        <input type="text" placeholder='Código de barras' inputMode='numeric' value={barcode} onChange={(e) => setBarcode(e.target.value)} />
        <BarcodeReader
          onRead={(code) => setBarcode(code)}
        />
      </div>
      <div>
        <input type='number' placeholder='Valor' inputMode='decimal' onChange={(e) => setAmount(+e.target.value)} value={amount} />
      </div>
      <div>
        <input type='number' placeholder='Quantidade' inputMode='decimal' onChange={(e) => setQuantity(+e.target.value)} value={quantity} min={1} />
      </div>
      <button onClick={handleAddItem}>Adicionar</button>
    </div>
    <div>
      <ul>
        {service.items.map(item => (<ProductItemList key={item.code} code={item.code} name={item.name} quantity={item.quantity} value={item.value} />))}
      </ul>
    </div>
  </S.MonthlyList>;
});

export const MonthlyListPage = () => {

  return <MonthlyListPageWrapped service={monthlyListService} />;
};
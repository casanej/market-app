import { useMutation } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { MonthlyListPageProps } from './index.type';
import * as S from './index.style';
import { monthlyListService } from '../../services/monthly-list/monthly-list.service';
import { moneyFormat } from '../../utils';
import { BarcodeReader } from '../../components/organism';
import { openFoodFactsApiService } from '../../services';
import { Button, ProductItemList, Textfield } from '../../components/atoms';


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
    setProductName('');
    setQuantity(1);
    setAmount(0);
  };

  return <S.MonthlyList className='container flex flex-col gap-8'>
    <S.MonthlyListAdd>
      <S.MonthlyListAddReader>
        <Textfield
          inputMode='numeric'
          label='Código de barras'
          type='text'
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
        <div>ou</div>
        <BarcodeReader
          onRead={(code) => setBarcode(code)}
        />
      </S.MonthlyListAddReader>
      <div className='flex flex-row gap-6 flex-1' >
        <Textfield
          label='Nome do produto'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Textfield
          inputMode='decimal'
          label='Valor'
          type='number'
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          min={0}
        />
        <Textfield
          inputMode='decimal'
          label='Quantidade'
          type='number'
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
          min={1}
        />
      </div>
      <Button fullWidth onClick={handleAddItem}>Adicionar</Button>
    </S.MonthlyListAdd>
    <h1>Total: {moneyFormat(service.total)}</h1>
    <div className='flex flex-col gap-4'>
      {service.items.map(item => (<ProductItemList key={item.code} code={item.code} name={item.name} quantity={item.quantity} value={item.value} lastPrice={item.lastPrice} />))}
    </div>
  </S.MonthlyList>;
});

export const MonthlyListPage = () => {

  return <MonthlyListPageWrapped service={monthlyListService} />;
};
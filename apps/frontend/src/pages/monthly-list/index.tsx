import { useMutation } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { MonthlyListPageProps } from './index.type';
import * as S from './index.style';
import { monthlyListService } from '../../services/monthly-list/monthly-list.service';
import { moneyFormat } from '../../utils';
import { BarcodeReader } from '../../components/organism';
import { openFoodFactsApiService } from '../../services';
import { Button, ProductItemList, Textfield } from '../../components/atoms';


const MonthlyListPageWrapped = observer(({ service }: MonthlyListPageProps) => {
  const { mutate: mutationProductCodeBar } = useMutation({
    mutationFn: (barcode: string) => openFoodFactsApiService.getProduct(barcode),
    onSuccess: (data) => {
      service.sketchItemEdit('name', `${data.product.brands} - ${data.product.product_name}`);
    },
    onError: () => {
      service.sketchItemEdit('name', 'Produto não encontrado');
    },

  });

  useEffect(() => {
    if (service.item.code.value && service.item.code.value.length === 13) {
      mutationProductCodeBar(service.item.code.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service.item.code.value]);

  const handleAddItem = () => {
    service.sketchItemAdd();
  };

  return <S.MonthlyList className='container flex flex-col gap-8'>
    <S.MonthlyListAdd>
      <S.MonthlyListAddReader>
        <Textfield
          errorMessage={service.item.code.error}
          inputMode='numeric'
          label='Código de barras'
          type='text'
          value={service.item.code.value}
          onChange={(e) => service.sketchItemEdit('code', e.target.value)}
        />
        <div>ou</div>
        <BarcodeReader
          onRead={(code) => service.sketchItemEdit('code', code)}
        />
      </S.MonthlyListAddReader>
      <div className='flex flex-row gap-6 flex-1' >
        <Textfield
          errorMessage={service.item.name.error}
          label='Nome do produto'
          value={service.item.name.value}
          onChange={(e) => service.sketchItemEdit('name', e.target.value)}
        />
        <Textfield
          errorMessage={service.item.price.error}
          inputMode='decimal'
          label='Preço'
          type='number'
          value={service.item.price.value}
          onBlur={() => service.sketchValidateField('price')}
          onChange={(e) => service.sketchItemEdit('price', +e.target.value)}
          min={0}
        />
        <Textfield
          errorMessage={service.item.quantity.error}
          inputMode='decimal'
          label='Quantidade'
          type='number'
          value={service.item.quantity.value}
          onChange={(e) => service.sketchItemEdit('quantity', +e.target.value)}
          min={1}
        />
      </div>
      <Button fullWidth onClick={handleAddItem}>Adicionar</Button>
    </S.MonthlyListAdd>
    <h1>Total: {moneyFormat(service.total)}</h1>
    <div className='flex flex-col gap-4'>
      {service.items.map(item => (<ProductItemList key={item.code} code={item.code} name={item.name} quantity={item.quantity} price={item.price} lastPrice={item.lastPrice} />))}
    </div>
  </S.MonthlyList>;
});

export const MonthlyListPage = () => {

  return <MonthlyListPageWrapped service={monthlyListService} />;
};
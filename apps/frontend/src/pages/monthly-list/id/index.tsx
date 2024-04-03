import { useMutation } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MonthlyListPageProps } from './index.type';
import { monthlyListService } from '../../../services/monthly-list/monthly-list.service';
import { moneyFormat } from '../../../utils';
import { BarcodeReader } from '../../../components/organism';
import { Button, ProductItemList, Textfield } from '../../../components/atoms';
import { marketAppBackend } from '../../../services';

const MonthlyListPageWrapped = observer(({ service }: MonthlyListPageProps) => {
  const { mutate: mutationProductCodeBar, isPending: isPendingProductName, isError: isErrorProductName } = useMutation({
    mutationFn: (barcode: string) => marketAppBackend.getProduct(barcode),
    onSuccess: (data) => {
      service.sketchItemEdit('name', data.showName);
    },
  });

  useEffect(() => {
    if (service.item.code.value && service.item.code.value.length === 13) {
      mutationProductCodeBar(service.item.code.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service.item.code.value]);

  const handleHelperProductName = useMemo(() => {
    if (service.item.code.value.length !== 13) return 'Insira o código de barras para buscar o nome do produto';
    if (isPendingProductName) return 'Buscando nome do produto...';
    if (isErrorProductName) return 'Nome do produto não encontrado';

    return undefined;
  }, [isPendingProductName, isErrorProductName, service.item.code.value]);

  return <div className='container flex flex-col gap-6'>
    <div className='flex flex-col gap-2 text-center'>
      <BarcodeReader
        onRead={(code) => service.sketchItemEdit('code', code)}
      />
      <div>ou</div>
      <Textfield
        errorMessage={service.item.code.error}
        inputMode='numeric'
        label='Código de barras'
        type='text'
        value={service.item.code.value}
        onChange={(e) => service.sketchItemEdit('code', e.target.value)}
      />
      <Textfield
        errorMessage={service.item.name.error}
        label='Nome do produto'
        value={service.item.name.value}
        helperText={handleHelperProductName}
        onChange={(e) => service.sketchItemEdit('name', e.target.value)}
      />
      <Textfield
        errorMessage={service.item.price.error}
        label='Preço'
        type='number'
        value={service.item.price.value}
        onBlur={() => service.sketchValidateField('price')}
        onChange={(e) => service.sketchItemEdit('price', +e.target.value)}
        min={0}
      />
      <div className='flex flex-row gap-2'>
        <Button fullWidth onClick={() => service.sketchCountQuantity(-1)}>-</Button>
        <Textfield
          errorMessage={service.item.quantity.error}
          label='Quantidade'
          type='number'
          value={service.item.quantity.value}
          onChange={(e) => service.sketchItemEdit('quantity', +e.target.value)}
          min={1}
        />
        <Button fullWidth onClick={() => service.sketchCountQuantity(+1)}>+</Button>
      </div>
      <div className='flex flex-col gap-2'>
        <Button fullWidth onClick={() => service.sketchItemAdd()}>Adicionar</Button>
        <Button fullWidth onClick={() => service.sketchItemReset()}>Limpar</Button>
      </div>
    </div>
    <h1>Total: {moneyFormat(service.total)}</h1>
    <div className='flex flex-col gap-4'>
      {service.items.map(item => (<ProductItemList
        key={item.code}
        code={item.code}
        name={item.name}
        quantity={item.quantity}
        price={item.price}
        lastPrice={item.lastPrice}
        onRemove={(code) => service.removeItem(code)}
      />))}
    </div>
  </div>;
});

export const MonthlyListIdPage = () => {
  const { listId } = useParams<{ listId: string }>();

  const service = useMemo(() => monthlyListService, []);

  useEffect(() => {
    if (listId) service.updateListId(listId);
  }, [listId])

  return <MonthlyListPageWrapped service={service} />;
};
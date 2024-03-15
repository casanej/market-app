import { MonthlyListPageProps } from './index.type';
import { monthlyListService } from '../../services/monthly-list.service';
import { observer } from 'mobx-react-lite';
import { moneyFormat } from '../../utils';
import { BarcodeReader } from '../../components/organism';
import { useState } from 'react';


const MonthlyListPageWrapped = observer(({ service }: MonthlyListPageProps) => {
  const [barcode, setBarcode] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const handleAddItem = () => {
    service.addItem(barcode, amount);
    setBarcode('');
    setAmount(0);
  };

  return <div>
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
      <button onClick={handleAddItem}>Adicionar</button>
    </div>
    <div>
      <ul>
        {service.items.map((item, index) => {
          return <li key={index}>
            <div>{item.name}</div>
            <div>{moneyFormat(item.value)}</div>
          </li>;
        })}
      </ul>
    </div>
  </div>;
});

export const MonthlyListPage = () => {

  return <MonthlyListPageWrapped service={monthlyListService} />;
};
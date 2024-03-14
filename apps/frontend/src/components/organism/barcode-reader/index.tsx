import Quagga from '@ericblade/quagga2';
import { FC, useCallback, useRef } from 'react';
// import * as S from './index.style';

interface BarcodeReaderProps {
  onRead: (barCode: string) => void
}

export const BarcodeReader: FC<BarcodeReaderProps> = ({ onRead }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const initReader = useCallback(() => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#reader')!
      },
      decoder: {
        readers: ['ean_reader']
      }
    }, (err: unknown) => {
      if (err) {
        console.log('ERRO', err)
        return
      }

      targetRef.current!.style.display = 'block';

      Quagga.start();
      Quagga.onDetected((data) => {
        if (data.codeResult.startInfo.error === 0) {
          onRead(data.codeResult.code ?? 'No identified')
          Quagga.stop();
          targetRef.current!.style.display = 'none';
        }

      })
    })
  }, [onRead])

  return <div>
    <button onClick={initReader}>Iniciar Leitura</button>
    <div ref={targetRef} id='reader' style={{ display: 'none' }} />
  </div>
};

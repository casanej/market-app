import { QuaggaJSResultObject } from '@ericblade/quagga2';
import { FC, useEffect, useState } from 'react';
import * as S from './index.style';
import { BarcodeReaderDevices } from './components/devices-options';
import { quaggaService } from './service/index.sevice';

interface BarcodeReaderProps {
  onRead: (barCode: string) => void
}

export const BarcodeReader: FC<BarcodeReaderProps> = ({ onRead }) => {
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | undefined>(undefined);

  const handleRead = (result: QuaggaJSResultObject) => {
    if (result.codeResult.startInfo.error === 0) {
      onRead(result.codeResult.code || '');
      quaggaService.stop();
    }
  }

  const handleStart = () => {
    quaggaService.initialize().onDetected(handleRead);
  }

  useEffect(() => {
    if (selectedDevice) {
      quaggaService.changeDevice(selectedDevice.deviceId);
    }
  }, [selectedDevice]);

  return <div>
    <div>
      <button onClick={handleStart}>Iniciar Leitura</button>
    </div>
    <div>
      <div>
        <BarcodeReaderDevices onSelect={setSelectedDevice} />
      </div>
      <S.BarcodeVideoOverlay id='barcode-reader' />
    </div>
  </div>
};

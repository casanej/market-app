import { FC, useEffect, useMemo, useState } from 'react';
import { QuaggaJSResultObject } from '@ericblade/quagga2';
import { BarcodeReaderDevices } from './components/devices-options';
import { quaggaService } from './service/index.sevice';
import * as S from './index.style';
import { Button } from '../../atoms';

interface BarcodeReaderProps {
  onRead: (barCode: string) => void
}

export const BarcodeReader: FC<BarcodeReaderProps> = ({ onRead }) => {
  const [isReading, setIsReading] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | undefined>(undefined);

  const handleRead = (result: QuaggaJSResultObject) => {
    if (result.codeResult.startInfo.error === 0) {
      onRead(result.codeResult.code || '');
      quaggaService.stop();
      setIsReading(false);
    }
  }

  const handleToggleReader = () => {
    if (isReading) {
      quaggaService.stop();
      setIsReading(false);
    } else {
      quaggaService.initialize(undefined,
        () => { setIsReading(true) }
      ).onDetected(handleRead);
    }
  }

  useEffect(() => {
    if (selectedDevice) {
      quaggaService.changeDevice(selectedDevice.deviceId);
    }
  }, [selectedDevice]);

  const renderButtonLabel = useMemo(() => {
    return isReading ? 'Parar leitura' : 'Ler código de barras';
  }, [isReading]);

  return <div>
    <div>
      <S.BarcodeVideoOverlay id='barcode-reader' />
      {
        isReading && <div>
          <BarcodeReaderDevices onSelect={setSelectedDevice} />
        </div>
      }
      <div>
        <Button fullWidth onClick={handleToggleReader}>{renderButtonLabel}</Button>
      </div>
    </div>
  </div>
};

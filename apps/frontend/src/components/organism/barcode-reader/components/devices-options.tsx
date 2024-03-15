import { FC, useEffect, useState } from 'react';
import { BarcodeReaderDevicesProps } from '../index.type';
import { quaggaService } from '../service/index.sevice';

export const BarcodeReaderDevices: FC<BarcodeReaderDevicesProps> = ({ onSelect }) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    quaggaService.getDevices().then((devices) => {
      setDevices(devices);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const device = devices.find((device) => device.deviceId === event.target.value);
    onSelect(device);
  }

  if (devices.length === 0) return <div>No devices found</div>;

  return <select onChange={handleChange}>
    <option value='none' >Default</option>
    {devices.map((device) => <option key={device.deviceId} value={device.deviceId}>{device.label}</option>)}
  </select>;
};

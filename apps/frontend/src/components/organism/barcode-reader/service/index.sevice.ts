import Quagga, { QuaggaJSResultCallbackFunction } from "@ericblade/quagga2";

const KEY_LAST_USED_DEVICE = 'last-used-device-id';

export const quaggaService = {
  lastUsedDevice: localStorage.getItem(KEY_LAST_USED_DEVICE) || '',
  target: null as unknown as HTMLElement,
  changeDevice: function (deviceId: string) {
    Quagga.CameraAccess.enumerateVideoDevices().then((devices) => {
      const device = devices.find((device) => device.deviceId === deviceId);
      if (device) {
        localStorage.setItem(KEY_LAST_USED_DEVICE, device.deviceId);
        this.stop();
        this.initialize(device.deviceId);
      }
    });

    return this;
  },
  getDevices: function () {
    return Quagga.CameraAccess.enumerateVideoDevices().then((devices) => {
      return devices;
    });
  },
  getElement: function () {
    if (this.target === null) {
      try {
        const element = document.getElementById('barcode-reader')!;
        this.target = element;
      } catch (error) {
        console.error('[ERROR]', 'Element not found.', error);
      }
    }

    return this.target;
  },
  getLastUsedDevice: function () {
    if (this.lastUsedDevice) return this.lastUsedDevice;

    return localStorage.getItem(KEY_LAST_USED_DEVICE) || '';
  },
  initialize: function (deviceId?: string) {

    const activeDeviceId = deviceId || this.getLastUsedDevice();

    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: this.getElement(),
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment",
          deviceId: activeDeviceId,
        }
      },
      decoder: {
        readers: ["ean_reader"]
      }
    }).then(() => { this.start(null) }).catch(console.error);

    return this;
  },
  start: function (err: unknown) {
    if (err) {
      console.log(err);
      return;
    }
    Quagga.start();
    this.target.style.display = 'inline-block';

    return this;
  },
  stop: function () {
    Quagga.stop();
    this.target.style.display = 'none';

    return this;
  },
  onDetected: (callback: QuaggaJSResultCallbackFunction) => {
    Quagga.onDetected(callback);

    return this;
  }
};
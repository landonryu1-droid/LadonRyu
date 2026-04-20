import QRCode from 'qrcode.react';

export default function Page() {
  return (
    <div>
      <h1>LadonRyu Live Translator</h1>
      <QRCode value="https://ladonryu.live" />
    </div>
  );
}
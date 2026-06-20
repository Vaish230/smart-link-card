import { QRCodeSVG } from 'qrcode.react';
import './QrPanel.css';

/**
 * QrPanel — renders the QR code for a card's shareable link, plus the
 * raw link as selectable text underneath for accessibility / fallback
 * (not everyone scanning is on a device that can use a camera).
 */
export default function QrPanel({ value, size = 128 }) {
  if (!value) return null;

  return (
    <QRCodeSVG
      value={value}
      size={size}
      bgColor="#f6f2ea"
      fgColor="#16140f"
      level="M"
      includeMargin={false}
    />
  );
}

export function QrPanelStandalone({ value, size = 200, title, description }) {
  return (
    <div className="qr-standalone">
      <div className="qr-standalone__code">
        <QRCodeSVG
          value={value}
          size={size}
          bgColor="#f6f2ea"
          fgColor="#16140f"
          level="M"
          includeMargin={false}
        />
      </div>
      <div className="qr-standalone__meta">
        <span className="qr-standalone__label">Scan to open</span>
        {title && <span className="qr-standalone__title">{title}</span>}
        <a
          className="qr-standalone__link"
          href={value}
          target="_blank"
          rel="noopener noreferrer"
        >
          {value}
        </a>
      </div>
    </div>
  );
}

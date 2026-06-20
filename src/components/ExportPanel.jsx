import { useState } from 'react';
import Button from './Button';
import { copyToClipboard } from '../utils/clipboard';
import './ExportPanel.css';

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const LinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * ExportPanel — the "ship it" actions: download the card as a PNG, or
 * copy its shareable link. Both actions are async and show transient
 * success/error state so the person gets feedback without a toast lib.
 */
export default function ExportPanel({ shareUrl, onDownload, disabled }) {
  const [copyState, setCopyState] = useState('idle'); // idle | copied | error
  const [downloadState, setDownloadState] = useState('idle'); // idle | working | error

  async function handleCopy() {
    const success = await copyToClipboard(shareUrl);
    setCopyState(success ? 'copied' : 'error');
    window.setTimeout(() => setCopyState('idle'), 2000);
  }

  async function handleDownload() {
    setDownloadState('working');
    try {
      await onDownload();
      setDownloadState('idle');
    } catch (err) {
      setDownloadState('error');
      window.setTimeout(() => setDownloadState('idle'), 2000);
    }
  }

  return (
    <div className="export-panel">
      <Button
        variant="primary"
        size="md"
        icon={<DownloadIcon />}
        onClick={handleDownload}
        disabled={disabled || downloadState === 'working'}
        fullWidth
      >
        {downloadState === 'working' && 'Preparing PNG…'}
        {downloadState === 'error' && 'Could not export — try again'}
        {downloadState === 'idle' && 'Download as PNG'}
      </Button>

      <Button
        variant="secondary"
        size="md"
        icon={copyState === 'copied' ? <CheckIcon /> : <LinkIcon />}
        onClick={handleCopy}
        disabled={disabled}
        fullWidth
      >
        {copyState === 'copied' && 'Link copied'}
        {copyState === 'error' && 'Could not copy — select manually'}
        {copyState === 'idle' && 'Copy shareable link'}
      </Button>

      {shareUrl && (
        <p className="export-panel__url" title={shareUrl}>
          {shareUrl}
        </p>
      )}
    </div>
  );
}

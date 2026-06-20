import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import LinkCard from '../components/LinkCard';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { decodeCard } from '../utils/cardEncoding';
import { downloadNodeAsPng } from '../utils/exportImage';
import { copyToClipboard } from '../utils/clipboard';
import { useState } from 'react';
import './CardViewerPage.css';

const ExternalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

/**
 * CardViewerPage — the destination the QR code (and shared link) point
 * to. Pure read view: decodes the token from the URL, renders the same
 * LinkCard the creator saw, and offers the visitor the same export
 * options plus a direct "Open link" action to follow the destination.
 */
export default function CardViewerPage() {
  const { token } = useParams();
  const card = useMemo(() => decodeCard(token), [token]);
  const cardRef = useRef(null);
  const [copyLabel, setCopyLabel] = useState('Copy link');

  async function handleDownload() {
    if (!cardRef.current) return;
    await downloadNodeAsPng(cardRef.current, card?.title || 'smart-link-card');
  }

  async function handleCopy() {
    const success = await copyToClipboard(window.location.href);
    setCopyLabel(success ? 'Link copied' : 'Could not copy');
    window.setTimeout(() => setCopyLabel('Copy link'), 2000);
  }

  if (!card || !card.title) {
    return (
      <main className="viewer viewer--empty">
        <EmptyState />
      </main>
    );
  }

  return (
    <main className="viewer">
      <div className="viewer__stage">
        <LinkCard ref={cardRef} title={card.title} description={card.description} url={card.url} />

        <div className="viewer__actions">
          <Button
            as="a"
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            icon={<ExternalIcon />}
            fullWidth
          >
            Open link
          </Button>
          <div className="viewer__actions-row">
            <Button variant="secondary" icon={<DownloadIcon />} onClick={handleDownload} fullWidth>
              Save as PNG
            </Button>
            <Button variant="ghost" icon={<CopyIcon />} onClick={handleCopy} fullWidth>
              {copyLabel}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

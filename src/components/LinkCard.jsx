import { forwardRef } from 'react';
import './LinkCard.css';

/**
 * LinkCard — the visual artifact itself: what gets previewed live,
 * captured to PNG, and shown on the public viewer page. Forwarded ref
 * so callers (preview + viewer) can hand the DOM node straight to the
 * PNG export util without extra plumbing.
 */
const LinkCard = forwardRef(function LinkCard(
  { title, description, url, qrSlot, isPlaceholder = false },
  ref
) {
  const displayTitle = title || 'Your card title';
  const displayDescription = description || 'A short description of where this link leads.';
  const displayUrl = formatUrlForDisplay(url);

  return (
    <div
      ref={ref}
      className={`link-card ${isPlaceholder ? 'link-card--placeholder' : ''}`}
    >
      <div className="link-card__grain" aria-hidden="true" />
      <div className="link-card__corner" aria-hidden="true" />

      <div className="link-card__body">
        <span className="link-card__eyebrow">Smart Link Card</span>
        <h2 className="link-card__title">{displayTitle}</h2>
        <p className="link-card__description">{displayDescription}</p>
      </div>

      <div className="link-card__footer">
        <div className="link-card__url-block">
          <span className="link-card__url-label">Destination</span>
          <span className="link-card__url">{displayUrl || 'your-link.com'}</span>
        </div>

        {qrSlot && <div className="link-card__qr">{qrSlot}</div>}
      </div>
    </div>
  );
});

function formatUrlForDisplay(url) {
  if (!url) return '';
  try {
    const u = new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, '') + (u.pathname !== '/' ? u.pathname : '');
  } catch (err) {
    return url;
  }
}

export default LinkCard;

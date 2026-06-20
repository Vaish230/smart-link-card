import './Panel.css';

/**
 * Panel — the reusable glass-surface container used for the form card,
 * preview card, and other grouped sections. Keeps the surface styling
 * (border, blur, radius) in exactly one place.
 */
export default function Panel({ as = 'div', title, eyebrow, children, className = '' }) {
  const Tag = as;
  return (
    <Tag className={`panel ${className}`}>
      {(title || eyebrow) && (
        <div className="panel__head">
          {eyebrow && <span className="panel__eyebrow">{eyebrow}</span>}
          {title && <h3 className="panel__title">{title}</h3>}
        </div>
      )}
      <div className="panel__body">{children}</div>
    </Tag>
  );
}

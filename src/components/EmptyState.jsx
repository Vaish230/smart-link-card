import { Link } from 'react-router-dom';
import Button from './Button';
import './EmptyState.css';

/**
 * EmptyState — shown on the viewer page when a link is malformed or
 * missing. Speaks in the interface's voice: states what happened and
 * what to do next, no apology, no ambiguity.
 */
export default function EmptyState() {
  return (
    <div className="empty-state">
      <span className="empty-state__glyph" aria-hidden="true">◇</span>
      <h2 className="empty-state__title">This card link isn't readable</h2>
      <p className="empty-state__copy">
        The link is missing its card data or has been altered. Generate a new
        card to get a fresh, working link.
      </p>
      <Button as="a" href="/" variant="primary">
        Create a card
      </Button>
    </div>
  );
}

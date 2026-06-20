import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="app-header__brand">
        <span className="app-header__mark" aria-hidden="true">◆</span>
        <span className="app-header__name">Smart Link Card</span>
      </Link>
      <span className="app-header__tagline">Turn any link into a card worth scanning</span>
    </header>
  );
}

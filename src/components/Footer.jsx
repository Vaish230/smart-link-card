import Button from './Button';
import './Footer.css';

const CREATOR = {
  name: 'Vaishnavi Awate',
  email: 'vaishnavi230906@gmail.com',
};

/**
 * Footer — always visible across the app. Carries:
 *  1. The creator's identity (static — name + email, not user-editable).
 *  2. The mandatory "Built for Digital Heroes" attribution link.
 */
export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div className="app-footer__identity">
          <span className="app-footer__identity-label">Made by</span>
          <p className="app-footer__identity-name">{CREATOR.name}</p>
          <a className="app-footer__identity-email" href={`mailto:${CREATOR.email}`}>
            {CREATOR.email}
          </a>
        </div>

        <div className="app-footer__attribution">
          <p className="app-footer__copy">
            © {new Date().getFullYear()} Smart Link Card. Crafted as a lightweight,
            no-backend way to turn any link into something worth sharing.
          </p>
          <Button
            as="a"
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-accent"
            size="sm"
          >
            Built for Digital Heroes
          </Button>
        </div>
      </div>
    </footer>
  );
}

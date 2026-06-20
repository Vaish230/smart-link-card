import { useMemo, useRef, useState } from 'react';
import CardForm from '../components/CardForm';
import LinkCard from '../components/LinkCard';
import QrPanel from '../components/QrPanel';
import ExportPanel from '../components/ExportPanel';
import Panel from '../components/Panel';
import { validateCardForm, normalizeUrl } from '../utils/validation';
import { buildShareUrl } from '../utils/cardEncoding';
import { downloadNodeAsPng } from '../utils/exportImage';
import './GeneratorPage.css';

const INITIAL_VALUES = { title: '', description: '', url: '' };

/**
 * GeneratorPage — the main product surface. Owns form state, derives
 * the share URL + QR payload from it, and wires up the export panel.
 * The preview re-renders on every keystroke (no debounce needed; the
 * render is cheap), giving the "live preview" feel the brief asks for.
 */
export default function GeneratorPage() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState(false);
  const cardRef = useRef(null);

  const errors = useMemo(() => (touched ? validateCardForm(values) : {}), [values, touched]);
  const isComplete = useMemo(() => {
    const formErrors = validateCardForm(values);
    return Object.keys(formErrors).length === 0;
  }, [values]);

  const shareUrl = useMemo(() => {
    if (!isComplete) return '';
    return buildShareUrl({
      title: values.title.trim(),
      description: values.description.trim(),
      url: normalizeUrl(values.url.trim()),
    });
  }, [values, isComplete]);

  function handleChange(field, value) {
    setTouched(true);
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleDownload() {
    if (!cardRef.current) return;
    await downloadNodeAsPng(cardRef.current, values.title || 'smart-link-card');
  }

  return (
    <main className="generator">
      <section className="generator__intro">
        <span className="generator__eyebrow">No backend. No sign-up. Just a link.</span>
        <h1 className="generator__heading">
          Turn any link into a card people actually want to tap.
        </h1>
        <p className="generator__subheading">
          Fill in the details on the left, watch the card build itself on the
          right, then download it or hand someone the QR code.
        </p>
      </section>

      <section className="generator__workspace">
        <Panel eyebrow="01 · Details" title="Describe your link" className="generator__form-panel">
          <CardForm values={values} errors={errors} onChange={handleChange} />
        </Panel>

        <Panel eyebrow="02 · Preview" title="Live card" className="generator__preview-panel">
          <div className="generator__preview-stage">
            <LinkCard
              ref={cardRef}
              title={values.title}
              description={values.description}
              url={values.url}
              isPlaceholder={!values.title && !values.url}
              qrSlot={shareUrl ? <QrPanel value={shareUrl} size={68} /> : null}
            />
          </div>

          <div className="generator__export">
            {!isComplete && (
              <p className="generator__export-hint">
                Add a title and a valid link to unlock the QR code and export
                options.
              </p>
            )}
            <ExportPanel
              shareUrl={shareUrl}
              onDownload={handleDownload}
              disabled={!isComplete}
            />
          </div>
        </Panel>
      </section>
    </main>
  );
}

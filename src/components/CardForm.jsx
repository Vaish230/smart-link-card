import FormField from './FormField';
import './CardForm.css';

/**
 * CardForm — the editable fields that drive the live preview.
 * Fully controlled: parent (GeneratorPage) owns all state, this
 * component just renders fields and reports changes upward.
 */
export default function CardForm({ values, errors, onChange }) {
  return (
    <form className="card-form" onSubmit={(e) => e.preventDefault()} noValidate>
      <FormField
        id="card-title"
        label="Title"
        value={values.title}
        onChange={(v) => onChange('title', v)}
        placeholder="e.g. My Portfolio"
        maxLength={60}
        error={errors.title}
        required
      />

      <FormField
        id="card-description"
        label="Description"
        as="textarea"
        value={values.description}
        onChange={(v) => onChange('description', v)}
        placeholder="A short line about where this link leads."
        maxLength={140}
        error={errors.description}
      />

      <FormField
        id="card-url"
        label="Destination link"
        value={values.url}
        onChange={(v) => onChange('url', v)}
        placeholder="example.com/your-page"
        error={errors.url}
        hint="The page people land on when they tap your card or scan the QR."
        required
      />
    </form>
  );
}

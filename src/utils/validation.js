/**
 * validation.js
 *
 * Lightweight, dependency-free validators for the card form.
 * Kept pure (no DOM, no React) so they're trivially testable.
 */

export function isValidUrl(value) {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

export function isValidEmail(value) {
  if (!value) return true; // email is optional metadata
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Normalizes a URL that's missing a protocol (e.g. "example.com" -> "https://example.com").
 */
export function normalizeUrl(value) {
  if (!value) return '';
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function validateCardForm({ title, url }) {
  const errors = {};
  if (!title || !title.trim()) {
    errors.title = 'Give your card a title.';
  } else if (title.length > 60) {
    errors.title = 'Keep titles under 60 characters.';
  }

  if (!url || !url.trim()) {
    errors.url = 'A destination link is required.';
  } else if (!isValidUrl(normalizeUrl(url))) {
    errors.url = "That doesn't look like a valid link.";
  }

  return errors;
}

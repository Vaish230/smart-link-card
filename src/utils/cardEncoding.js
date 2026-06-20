/**
 * cardEncoding.js
 *
 * Since this project has no backend, a card's data is encoded directly
 * into the shareable URL (base64url of a compact JSON payload). The
 * card viewer page decodes the same URL to render the card — so the
 * QR code and the "copy link" button both point at a fully self
 * contained, stateless link.
 */

const PAYLOAD_VERSION = 1;

/**
 * Converts a UTF-8 string to a base64url string (URL-safe, no padding).
 */
function toBase64Url(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Converts a base64url string back to a UTF-8 string.
 */
function fromBase64Url(b64url) {
  const base64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Encodes card fields into a compact, URL-safe token.
 * @param {{title: string, description: string, url: string, theme?: string}} card
 * @returns {string} token suitable for use in a query parameter
 */
export function encodeCard(card) {
  const payload = {
    v: PAYLOAD_VERSION,
    t: card.title || '',
    d: card.description || '',
    u: card.url || '',
    c: card.theme || 'amber',
  };
  return toBase64Url(JSON.stringify(payload));
}

/**
 * Decodes a token produced by encodeCard back into card fields.
 * Returns null if the token is missing or malformed.
 * @param {string} token
 */
export function decodeCard(token) {
  if (!token) return null;
  try {
    const json = fromBase64Url(token);
    const payload = JSON.parse(json);
    if (typeof payload !== 'object' || payload === null) return null;
    return {
      title: payload.t || '',
      description: payload.d || '',
      url: payload.u || '',
      theme: payload.c || 'amber',
    };
  } catch (err) {
    return null;
  }
}

/**
 * Builds the absolute shareable URL for a given card, pointing at the
 * card viewer route. This same URL is what gets embedded in the QR code.
 * @param {{title: string, description: string, url: string, theme?: string}} card
 */
export function buildShareUrl(card) {
  const token = encodeCard(card);
  const { origin } = window.location;
  return `${origin}/card/${token}`;
}

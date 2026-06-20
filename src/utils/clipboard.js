/**
 * clipboard.js
 *
 * Small wrapper around the Clipboard API with a manual fallback for
 * browsers/contexts where navigator.clipboard is unavailable
 * (e.g. non-secure contexts or older browsers).
 */

export async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let succeeded = false;
  try {
    succeeded = document.execCommand('copy');
  } catch (err) {
    succeeded = false;
  }
  document.body.removeChild(textarea);
  return succeeded;
}

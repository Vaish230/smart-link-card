/**
 * exportImage.js
 *
 * Wraps html-to-image to turn a card DOM node into a downloadable PNG.
 * Kept separate from components so the export logic can be reused
 * (e.g. by both the generator and the viewer pages) without duplication.
 */

import { toPng } from 'html-to-image';

/**
 * Renders a DOM node to a PNG data URL at a higher pixel ratio for
 * crisp downloads, then triggers a browser download.
 * @param {HTMLElement} node - the element to capture
 * @param {string} filename - filename without extension
 */
export async function downloadNodeAsPng(node, filename = 'smart-link-card') {
  if (!node) throw new Error('No node provided for export.');

  const dataUrl = await toPng(node, {
    pixelRatio: 3,
    cacheBust: true,
    backgroundColor: undefined,
  });

  const link = document.createElement('a');
  link.download = `${sanitizeFilename(filename)}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function sanitizeFilename(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'smart-link-card';
}

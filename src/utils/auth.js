function fallbackHash(value) {
  return Array.from(value)
    .map((character) => character.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}

export async function hashText(value) {
  if (!value) {
    return '';
  }

  if (typeof crypto === 'undefined' || !crypto.subtle) {
    return fallbackHash(value);
  }

  const encodedValue = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', encodedValue);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

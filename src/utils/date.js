export function formatDisplayDate(value) {
  if (!value) {
    return 'Not set yet';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Not set yet';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function toDateInputValue(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toISOString().split('T')[0];
}

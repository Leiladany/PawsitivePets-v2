import { useEffect, useState } from 'react';

function getInitialValue(key, initialValue) {
  const fallbackValue =
    typeof initialValue === 'function' ? initialValue() : initialValue;

  if (typeof window === 'undefined') {
    return fallbackValue;
  }

  const storedValue = window.localStorage.getItem(key);

  if (!storedValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    return fallbackValue;
  }
}

function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => getInitialValue(key, initialValue));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;

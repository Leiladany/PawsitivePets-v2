export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Unable to read that image file.'));
        return;
      }

      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error('Unable to read that image file.'));
    };

    reader.readAsDataURL(file);
  });
}

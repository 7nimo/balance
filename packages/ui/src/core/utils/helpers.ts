/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export function capitalize (string: string): string {
  return string[0].toUpperCase() + string.slice(1);
}

// type Fun = <T extends any[]>(...args: T) => void;

export function debounce (fn: any, wait: number) {
  let timeout: any;

  return function executed (...args: any) {
    const callback = () => {
      timeout = null;
      fn(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(callback, wait);
  };
}

export function removeEmptyFields (data: any) {
  Object.keys(data).forEach((key) => {
    if (data[key] === '' || data[key] == null) {
      delete data[key];
    }
  });
}

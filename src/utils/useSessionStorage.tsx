import { useState } from "react";
import { UseSessionStorageProps } from "../types/UI";

export default function useSessionStorage<T>({
  key,
  initialValue,
}: UseSessionStorageProps<T>) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const data = sessionStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);

      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return [storedValue, setValue];
}

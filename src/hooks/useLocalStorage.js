import { useState } from 'react';

const useLocalStorage = (key) => {

    const [value, setValue] = useState(localStorage.getItem(key));

    // Update and save the value to local storage whenever it changes
    const setStoredValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, newValue);
    };

    const eraseStoredValue = () => {
        setValue(null);
        localStorage.removeItem(key);
    }

    return [value, setStoredValue, eraseStoredValue];
};

export default useLocalStorage;

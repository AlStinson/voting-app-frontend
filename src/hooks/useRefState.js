import { useCallback, useRef, useState } from "react"

const useRefState = (initialValue) => {
    const [stateValue, setStateValue] = useState(initialValue);
    const refValue = useRef(initialValue);

    const setValue = useCallback((newValue) => {
        refValue.current = newValue;
        setStateValue(newValue);
    }, []);

    return [refValue, stateValue, setValue];
}

export default useRefState;
import { useCallback, useEffect, useState } from "react";

const useFetch = (url, requestData) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [requestDataState] = useState(requestData)

    const fetchData = useCallback(() => {

        setData(null);
        setError(null);

        if (!url) return;

        fetch(url, requestDataState)
            .then(response => {
                if (!response.ok) throw new Error(`Response status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                setData(data);
                setError(null);
            })
            .catch(error => {
                setData(null);
                setError(error.message);
            });
    }, [url, requestDataState]);

    useEffect(() => fetchData(), [fetchData]);

    return [data, error, fetchData];
}

export default useFetch;
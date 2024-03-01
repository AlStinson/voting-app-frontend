import { useCallback, useEffect, useState } from "react";

const useFetch = (url, requestData, expectData=true) => {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [requestDataState] = useState(requestData)

    const fetchData = useCallback(() => {

        setLoading(true);
        setStatus(null);
        setData(null);
        setError(null);

        fetch(url, requestDataState)
            .then(response => {
                setStatus(response.status);
                if (expectData && response.ok) return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [url, requestDataState, expectData]);

    useEffect(() => fetchData(), [fetchData]);

    return [loading, status, data, error, fetchData];
}

export default useFetch;
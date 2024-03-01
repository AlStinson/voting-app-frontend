import { useCallback, useState } from "react";
import useRefState from "./useRefState";

const useFetch = (url, requestData, expectData = true) => {

    const [refLoading, stateLoading, setLoading] = useRefState(false)
    const [finish, setFinish] = useState(false)
    const [status, setStatus] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [requestDataState] = useState(requestData)

    const fetchData = useCallback(() => {

        if (refLoading.current) return;

        setLoading(true);
        setFinish(false);
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
                setFinish(true);
            })
    }, [url, requestDataState, expectData, refLoading, setLoading]);

    return [stateLoading, finish, status, data, error, fetchData];
}

export default useFetch;
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import "./VoteResultComponent.css"

const VoteResultComponent = ({ code, survey, vote, reset }) => {
    const [, finished, status,,error,fetchData] = useFetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/${code}/survey/${survey}/${vote}`, { method: "POST" }, false);

    useEffect(fetchData, [fetchData]);

    const result = () => {
        if (!finished) return <LoadingComponent />;
        if (status === 409) return <ErrorComponent message={"Ya has votado a este premio, no puedes votar de nuevo"} />;
        if (status >= 400 || error ) return <ErrorComponent message={"Error interno: Respuesta inesperada."} />
        return <div className="result-container green">Tu voto ha sido enviado.</div>
    }

    return <div>
        {result()}
        <button onClick={reset}>{"Lista de premios"}</button>

    </div>
}

export default VoteResultComponent;
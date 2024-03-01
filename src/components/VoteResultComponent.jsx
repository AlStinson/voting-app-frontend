import useFetch from "../hooks/useFetch";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import "./VoteResultComponent.css"

const VoteResultComponent = ({ code, survey, vote, reset }) => {
    const [loading, status] = useFetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/${code}/survey/${survey}/${vote}`, { method: "POST" });

    const result = () => {
        if (loading) return <LoadingComponent />;
        if (status === 409) return <ErrorComponent message={"Ya has votado a este premio, no puedes votar de nuevo"} />;
        if (status >= 400) return <ErrorComponent message={"Error interno: Respuesta inesperada."} />
        return <div className="result-container green">Tu voto ha sido enviado.</div>
    }

    return <div>
        {result()}
        <button onClick={reset}>{"Lista de premios"}</button>

    </div>
}

export default VoteResultComponent;
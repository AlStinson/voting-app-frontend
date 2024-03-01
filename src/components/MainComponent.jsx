import useFetch from "../hooks/useFetch";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import SurveyListComponent from "./SurveyListComponent";
import SurveyComponent from "./SurveyComponent";
import { useEffect, useState } from "react";
import VoteResultComponent from "./VoteResultComponent";

const MainComponent = ({ code, eraseCode }) => {

    const [, finished,  status, data, error, fetchData] = useFetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/${code}/survey`);
    const [option, setOption] = useState();
    const [vote, setVote] = useState();

    const reset = () => {
        fetchData();
        setOption(null);
        setVote(null);
    }

    useEffect(fetchData, [fetchData])

    if (!finished) return <LoadingComponent><button onClick={eraseCode}>Usar otro código</button></LoadingComponent>;
    if (status === 404) return <ErrorComponent message={"Código invalido."}><button onClick={eraseCode}>Usar otro código</button></ErrorComponent>
    if (status >= 400 || error) return <ErrorComponent message={`Error interno: ${error?.message || "Respuesta inesperada"}.`}><button onClick={eraseCode}>Usar otro código</button></ErrorComponent>;
    if (option == null) return <SurveyListComponent options={data} setOption={setOption} eraseCode={eraseCode} code={code}/>;
    if (vote == null) return <SurveyComponent survey={option} code={code} setVote={setVote} reset={reset} />;
    return <VoteResultComponent survey={option} vote={vote} code={code} reset={reset} />
}


export default MainComponent;
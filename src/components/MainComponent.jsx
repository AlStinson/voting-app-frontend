import useFetch from "../hooks/useFetch";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import SurveyListComponent from "./SurveyListComponent";
import './MainComponent.css'
import SurveyComponent from "./SurveyComponent";
import { useState } from "react";
import VoteResultComponent from "./VoteResultComponent";

const MainComponent = ({ code, eraseCode }) => {

    const [data, error, refresh] = useFetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/${code}/survey`);
    const [option, setOption] = useState();
    const [vote, setVote] = useState();

    const reset = () => {
        refresh();
        setOption(null);
        setVote(null);
    }

    const subcomponent = () => {
        if (!error && !data) return  <LoadingComponent />;
        if (error) return <ErrorComponent message={error} />;
        if (option == null) return <SurveyListComponent options={data} setOption={setOption} />;
        if (vote == null) return <SurveyComponent survey={option} code={code} setSurvey={setOption} setVote={setVote}/>;
        return <VoteResultComponent survey={option} vote={vote} code={code}/>
    }

    return <div className="container">
        <h1 className="headings">Welcome to the App!</h1>
        <button onClick={eraseCode}>Log out</button>
        <button onClick={reset}>{option == null ? "Refresh data" : "Back"}</button>
        {subcomponent()}
    </div>;
};

export default MainComponent;
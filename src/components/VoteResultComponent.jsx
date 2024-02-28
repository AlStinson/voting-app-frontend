import useFetch from "../hooks/useFetch";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import "./VoteResultComponent.css"

const VoteResultComponent = ({ code, survey, vote }) => {
    const [data, error] = useFetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/${code}/survey/${survey}/${vote}`, { method: "POST" });

    if (!error && !data) return <LoadingComponent />;
    if (error) return <ErrorComponent message={error} />;
    return <div className="result-container success-message">You successfully voted!</div>
}

export default VoteResultComponent;
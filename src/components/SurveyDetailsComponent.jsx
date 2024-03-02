import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import './SurveyDetailsComponent.css'
import useFetch from '../hooks/useFetch';
import ErrorComponent from './ErrorComponent';

const SurveyDetailsComponent = ({ survey, setSurvey, token, fetchListData }) => {

    const [, finished, status, data, error, fetchData] = useFetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/admin/survey/${survey.code}`,
        {
            method: "GET",
            headers: {
                "X-ADMIN": token,
            }
        }
    );

    const [loadingEnabled, finishedEnabled, , , , fetchDataEnabled] = useFetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/admin/survey/${survey.code}/enable`,
        {
            method: "POST",
            headers: {
                "X-ADMIN": token,
            }
        }
    );

    const [loadingDisabled, finishedDisabled, , , , fetchDataDisabled] = useFetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/admin/survey/${survey.code}/disable`,
        {
            method: "POST",
            headers: {
                "X-ADMIN": token,
            }
        }
    );

    const [, finishedBorrar, statusBorrar, , , fetchDataBorrar] = useFetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/admin/survey/${survey.code}`,
        {
            method: "DELETE",
            headers: {
                "X-ADMIN": token,
            }
        }
    );

    const borrar = () => {
        if (window.confirm(`Seguro que quieres borrar ${data.name}?`)) {
            fetchDataBorrar();
        }
    }

    useEffect(fetchData, [fetchData]);
    useEffect(() => {
        if (finishedEnabled || finishedDisabled ) {
            fetchListData();
            fetchData();
        } else if (finishedBorrar && statusBorrar < 300 && 199<statusBorrar) {
            setSurvey(null)
            fetchListData();
        }
    }, [finishedEnabled, finishedDisabled, finishedBorrar, statusBorrar, fetchData, fetchListData, setSurvey])


    if (!finished) return <LoadingComponent />;
    if (status >= 400 || error) return <ErrorComponent message={`Solicitud invalidad: ${error?.message || "Respuesta inesperada"}.`}><button onClick={() => setSurvey(null)}>Atrás</button></ErrorComponent>

    return <>
        <h2>{data.name}</h2>
        <p>{data.description}</p>
        {loadingEnabled || loadingDisabled ? <LoadingComponent/> :data.active ? <p className='green'> Activo </p> : <p className='red'>Inactivo</p>}
        <div>
            <button onClick={() => fetchDataEnabled()} disabled={data.active}>Activar</button>
            <button onClick={() => fetchDataDisabled()} disabled={!data.active}>Desactivar</button>
        </div>
        <div className="options-list">
            <h3>Nominados</h3>
            {data.options.sort((a, b) => b.votes - a.votes).map(option => (
                <div key={option.number} className="survey-option">
                    ({option.votes} votos) {option.value}
                </div>
            ))}
        </div>
        <button onClick={borrar}>Borrar</button>
        <button onClick={() => setSurvey(null)}>Atrás</button>
    </>
};

export default SurveyDetailsComponent;



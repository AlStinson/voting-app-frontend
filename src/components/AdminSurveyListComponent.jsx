import './AdminSurveyListComponent.css'
import ErrorComponent from './ErrorComponent';
import LoadingComponent from './LoadingComponent';

const AdminSurveyListComponent = ({ finished, data, status, eraseToken, error, setSelectedSurvey }) => {

    if (!finished) return <LoadingComponent><button onClick={eraseToken}>Usar otro token</button></LoadingComponent>;
    if (status === 404) return <ErrorComponent message={"Código invalido."}><button onClick={eraseToken}>Usar otro token</button></ErrorComponent>
    if (status >= 400 || error) return <ErrorComponent message={`Error interno: ${error?.message || "Respuesta inesperada"}.`}><button onClick={eraseToken}>Usar otro Token</button></ErrorComponent>;
    return <>
        <h2>Premios</h2>
        {
            data.length > 0 ?
                <ul className="options-list">
                    {data.map((survey, index) => (
                        <li key={index} onClick={() => { setSelectedSurvey(survey) }}>
                            <span>{survey.name}</span>
                            <span className={`active-slider ${survey.active ? "green" : "red"}`}>{survey.active ? "Activo" : "Inactivo"}</span>
                        </li>
                    ))}
                </ul> : <div className='message'>No hay ningún premio disponible. Crea uno para empezar.</div>
        }
    </>
};

export default AdminSurveyListComponent;



import { useEffect } from 'react';
import './ActionsComponent.css'
import LoadingComponent from './LoadingComponent';
import useFetch from '../hooks/useFetch';

const ActionsComponent = ({ token, setSelectedSurvey, refreshData }) => {

    const [loadingGet, , , dataGet, , fetchDataGet] = useFetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/admin/code/`,
        {
            method: "GET",
            headers: {
                "X-ADMIN": token,
            }
        }
    );
    const [loadingGen10, , , dataGen10, , fetchDataGen10] = useFetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/admin/code/generate`,
        {
            method: "POST",
            headers: {
                "X-ADMIN": token,
                "Content-Type": "application/json",

            },
            body: "10"
        }
    );
    const [loadingGen100, , , dataGen100, , fetchDataGen100] = useFetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/admin/code/generate`,
        {
            method: "POST",
            headers: {
                "X-ADMIN": token,
                "Content-Type": "application/json",
            },
            body: "100"
        }
    );

    useEffect(() => {
        if (dataGet) downloadData(dataGet);
    }, [dataGet])

    useEffect(() => {
        if (dataGen10) downloadData(dataGen10);
    }, [dataGen10])

    useEffect(() => {
        if (dataGen100) downloadData(dataGen100);
    }, [dataGen100])


    const deleteAllCodes = () => {
        window.alert("Esta operación es muy delicada ya que borra todos los votos actuales. Habla con un administrador si de verdad necesitas borras todos los códigos existentes.")
    }

    return <div>
        <div>
            <button onClick={() => setSelectedSurvey("new")}>Crear premio</button>
            <button onClick={refreshData}>Refrescar datos</button>
        </div>
        {loadingGet || loadingGen10 || loadingGen100 ? <LoadingComponent /> : <div>
            <button onClick={fetchDataGet}>Ver códigos</button>
            <button onClick={fetchDataGen10}>Generar 10 códigos</button>
            <button onClick={fetchDataGen100}>Generar 100 códigos</button>
            <button onClick={deleteAllCodes}>Borrar todos los códigos</button>
        </div>}
        <p>No hay ningún premio seleccionado. Seleciona uno o crea uno nuevo.</p>
    </div>
};

const downloadData = (data) => {
    const content = data.join("\n");
    const filename = "codes.csv"
    const blob = new Blob([content], {type: "text/csv"});

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export default ActionsComponent;



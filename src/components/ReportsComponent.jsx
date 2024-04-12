import { PieChart } from '@mui/x-charts';
import useFetch from '../hooks/useFetch';
import LoadingComponent from './LoadingComponent';
import './ReportsComponent.css'
import ErrorComponent from './ErrorComponent';
import { useEffect } from 'react';

const ReportsComponent = () => {

    const [, finished, status, data, error, fetchData] = useFetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/reports`);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    if (!finished) return <LoadingComponent></LoadingComponent>;
    if (status >= 400 || error) return <ErrorComponent message={`Error interno: ${error?.message || "Respuesta inesperada"}.`}></ErrorComponent>;

    return data.map(survey => {
        const serie = survey.options.map(({ number, value, votes }) => ({ id: number, value: votes, label: `${value} (${votes} votos)` }))
        return <PieChart
            key={survey.id}
            title={survey.name}
            desc={survey.description}
            series={[{ data: serie, arcLabel: (item) => `${item.value}` }]}
            height={200}
            width={800}
        />
    });
}

export default ReportsComponent;



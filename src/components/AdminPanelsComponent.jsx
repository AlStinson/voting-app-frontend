import { useEffect, useState } from 'react';
import './AdminPanelsComponent.css'
import CreateSurveyComponent from './CreateSurveyComponent';
import SurveyDetailsComponent from './SurveyDetailsComponent';
import ActionsComponent from './ActionsComponent';
import AdminSurveyListComponent from './AdminSurveyListComponent';
import useFetch from '../hooks/useFetch';

const AdminPanelsComponent = ({ token, eraseToken }) => {

    const [, finished, status, data, error, fetchData] = useFetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/admin/survey`, {
        headers: {
            "X-ADMIN": token
        }
    });

    useEffect(fetchData, [fetchData])

    const [selectedSurvey, setSelectedSurvey] = useState();

    return <div className='panels-container'>
        <section> <AdminSurveyListComponent finished={finished} status={status} data={data} refreshData={fetchData} error={error} eraseToken={eraseToken} setSelectedSurvey={setSelectedSurvey} /> </section>
        <div className='vertical-line' />
        <section>
            {selectedSurvey == null ? <ActionsComponent setSelectedSurvey={setSelectedSurvey} token={token} refreshData={fetchData} /> :
                (selectedSurvey === "new" || selectedSurvey === "sent") ? <CreateSurveyComponent token={token} setSurvey={setSelectedSurvey} refreshData={fetchData} /> :
                    <SurveyDetailsComponent survey={selectedSurvey} token={token} setSurvey={setSelectedSurvey} fetchListData={fetchData} />}
        </section>
    </div>
};

export default AdminPanelsComponent;



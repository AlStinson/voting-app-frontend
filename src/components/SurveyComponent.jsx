import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import LoadingComponent from './LoadingComponent';
import ErrorComponent from './ErrorComponent';

const SurveyComponent = ({ survey, code, setVote, reset }) => {

    const [selectedOption, setSelectedOption] = useState();
    const [, finished, status, data, error, fetchData] = useFetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/${code}/survey/${survey}`);
    const alreadyVoted = data && data.options.some(option => option.voted);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleVoteClick = () => {
        setVote(selectedOption);
    };

    useEffect(fetchData, [fetchData])

    if (!finished) return <LoadingComponent> <button onClick={reset}>{"Atrás"}</button></LoadingComponent>;
    if (status === 404) <ErrorComponent message={"El premio al que intentas acceder ya no está disponible."}> <button onClick={reset}>{"Atrás"}</button></ErrorComponent>;
    if (status >= 400 || error) return <ErrorComponent message={`Error interno: ${error?.message ?? "Respuesta inesperada"}.`}> <button onClick={reset}>{"Atrás"}</button></ErrorComponent>;

    return <>
        <h2>{data.name}</h2>
        <p>{data.description}</p>
        <ul className="options-list">
            {data.options.map(({ number, value, voted }, index) => (
                <li
                    key={number}
                    className={(selectedOption === number && !alreadyVoted) || voted  ? 'selected-option' : alreadyVoted ? "disabled" : ''}
                    onClick={() => handleOptionClick(number)}
                    disabled={alreadyVoted}
                >
                    {value}
                </li>
            ))}
        </ul>
        { alreadyVoted && <p className='green'>Ya has votado en este premio.</p>}
        <button onClick={handleVoteClick} disabled={selectedOption == null || alreadyVoted}>
            Votar
        </button>
        <button onClick={reset}>{"Atrás"}</button>
    </>;
}

export default SurveyComponent;
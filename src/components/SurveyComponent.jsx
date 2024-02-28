import React, { useState } from 'react';
import './SurveyComponent.css';
import useFetch from '../hooks/useFetch';
import LoadingComponent from './LoadingComponent';
import ErrorComponent from './ErrorComponent';

const SurveyComponent = ({ survey, setSurvey, code, setVote }) => {

    const [selectedOption, setSelectedOption] = useState();
    const [data, error] = useFetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/${code}/survey/${survey}`);
    const alreadyVoted = data && data.options.some(option => option.voted);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleVoteClick = () => {
        setVote(selectedOption);
    };

    if (!error && !data) return <LoadingComponent />;
    if (error) return <ErrorComponent message={error} />;

    return <div className="voting-container">
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        { alreadyVoted && <p className='already-voted'>You already voted in this Survey</p>}
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
        <button onClick={handleVoteClick} className="vote-button" disabled={selectedOption == null || alreadyVoted}>
            Vote
        </button>
    </div>;
}

export default SurveyComponent;
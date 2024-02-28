import React from 'react';
import './SurveyListComponent.css';

const SurveyListComponent = ({ options, setOption }) => {

    return (options.length > 0 ?
        <ul className="options-list">
            {options.map((option, index) => (
                <li key={index} onClick={() => setOption(option.code)}>
                    <span>{option.name}</span>
                    {option.voted && <span className="voted-text">Voted</span>}
                </li>
            ))}
        </ul> : <div className='message'>There are no Surveys availables right now!</div>
    );
};

export default SurveyListComponent;

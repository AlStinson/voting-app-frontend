import React from 'react';
import './SurveyListComponent.css';

const SurveyListComponent = ({ options, setOption, eraseCode, code }) => {

    return <div>
        <h2>Código: {code}</h2>
        {options.length > 0 ?
            <ul className="options-list">
                {options.map((option, index) => (
                    <li key={index} onClick={() => setOption(option.code)}>
                        <span>{option.name}</span>
                        {option.voted && <span className="voted-text green">Voted</span>}
                    </li>
                ))}
            </ul> : <div className='message'>No hay ningún premio disponible para votar ahora mismo. Intentalo más tarde.</div>
        }
        <button onClick={eraseCode}>Usar otro código</button>
    </div>
};

export default SurveyListComponent;

import { useState } from "react";
import './LoginComponent.css'

const LoginComponent = props => {

    const [userInput, setUserInput] = useState('');

    const handleSave = () => {
        props.setCode(userInput);
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value.slice(0, 6));
    };

    return <>
        <h2>Introduce tu código</h2>
            <input
                className="input"
                type="number"
                maxLength={6}
                value={userInput}
                onChange={handleInputChange}
                placeholder="123456"
            />
            <button className="button" onClick={handleSave}>
                Continuar
            </button>
    </>
}

export default LoginComponent
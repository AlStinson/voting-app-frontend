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

    return <div className="container">
        <h1 className="heading">Please enter your code</h1>

            <input
                className="input"
                type="number"
                maxLength={6}
                value={userInput}
                onChange={handleInputChange}
                placeholder="123456"
            />
            <button className="button" onClick={handleSave}>
                Save
            </button>
    </div>
}

export default LoginComponent
import { useState } from "react";
import './AdminLoginComponent.css'

const AdminLoginComponent = props => {

    const [userInput, setUserInput] = useState('');

    const handleSave = () => {
        props.setToken(userInput);
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    return <>
        <h2>Introduce tu token</h2>
            <input
                className="admin-input"
                value={userInput}
                onChange={handleInputChange}
                placeholder="LQep4osT8g3CJYjUkyG5pos4RmOkM1212dljq9Z5DMmJ0Hah1s9dazaI6xZlTxJz"
            />
            <button className="button" onClick={handleSave}>
                Continuar
            </button>
    </>
}

export default AdminLoginComponent
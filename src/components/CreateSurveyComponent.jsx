import { useEffect, useState } from 'react';
import './CreateSurveyComponent.css'
import useFetch from '../hooks/useFetch';
import LoadingComponent from './LoadingComponent';
import ErrorComponent from './ErrorComponent';

const CreateSurveyComponent = ({ token, setSurvey, refreshData }) => {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        options: [''],
    });

    const [loading, finished, status, data , error, fetchData, setFetchData] = useFetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/admin/survey/`, {})

    useEffect(() => { if (finished) setSurvey("sent") }, [setSurvey, finished])
    useEffect(
        () => {
            setFetchData({
                method: "POST",
                headers: {
                    "X-ADMIN": token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
        },
        [formData, token, setFetchData]
    );
    useEffect(() => {
        if (finished && status === 200) {
            setSurvey(data);
            refreshData();
            setFetchData({
                name: '',
                description: '',
                options: [''],
            });
        };
    }, [finished, status, refreshData, setFetchData, data, setSurvey]);


    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'options') {
            setFormData(prevState => {
                const updatedOptions = [...prevState.options];
                updatedOptions[index] = value;
                return { ...prevState, options: updatedOptions };
            });
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleAddOption = () => {
        setFormData(prevState => ({ ...prevState, options: [...prevState.options, ''] }));
    };

    const handleRemoveOption = (index) => {
        setFormData(prevState => {
            const updatedOptions = [...prevState.options];
            updatedOptions.splice(index, 1);
            return { ...prevState, options: updatedOptions }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    if (loading) return <LoadingComponent />;
    if (status === 400) return <ErrorComponent message={`Solicitud invalidad: ${error?.message || "Respuesta inesperada"}.`}><button onClick={() => setSurvey(null)}>Atrás</button></ErrorComponent>
    if (status >= 400 || error) return <ErrorComponent message={`Solicitud invalidad: ${error?.message || "Respuesta inesperada"}.`}><button onClick={() => setSurvey(null)}>Atrás</button></ErrorComponent>
    if (status === 200) return <div><p className='green'>Premio creado correctamente.</p><button onClick={() => setSurvey(null)}>Continuar</button></div>

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Premio:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Descripción:
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Nominados:
                {formData.options.map((option, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="options"
                            value={option}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                        <button type="button" onClick={() => handleRemoveOption(index)}>
                        ❌
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddOption}>
                    Añadir opción
                </button>
            </label>
            <br />
            <button type="submit" >Guardar</button>
            <button type='cancel' onClick={() => setSurvey(null)}>Cancelar</button>
        </form>
    );
};

export default CreateSurveyComponent;



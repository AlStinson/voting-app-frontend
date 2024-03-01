import './ErrorComponent.css'

const ErrorComponent = ({ message, children }) => {
    return <>
        <div className="error-message">
            {message}
        </div>
        {children}
    </>
}

export default ErrorComponent;
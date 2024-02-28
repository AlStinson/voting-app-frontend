import './ErrorComponent.css'

const ErrorComponent = props => {
    return <div className="error-message">
        There is an internal problem. Try refresh later. Error: {props.message}
    </div>
}

export default ErrorComponent;
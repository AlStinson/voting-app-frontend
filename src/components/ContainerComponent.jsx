import "./ContainerComponent.css";

const ContainerComponent = ({ children }) => {
    return <>
        <header>
            <h1>Gala Cauchynillos {new Date().getFullYear()}</h1>
        </header>
        <main> {children} </main>
        <footer>
            <p>&copy; AlStinson 2024. All rights reserved.</p>
        </footer>
    </>
}

export default ContainerComponent;
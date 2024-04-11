import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "./styles/index.css";
import "./styles/list.css";
import "./styles/button.css";
import "./styles/color.css";
import { Link, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import ContainerComponent from './components/ContainerComponent';
import ErrorComponent from './components/ErrorComponent';
import AdminApp from './AdminApp';
import LoadingComponent from './components/LoadingComponent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/admin",
    element: <AdminApp />
  },
  {
    path: "*",
    element: <ErrorComponent message="404 - Demostración no encontrada"><Link to="/" style={{ color: "white" }}>Volver a los premios</Link></ErrorComponent>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContainerComponent>
      <RouterProvider router={router} fallbackElement={LoadingComponent} />
    </ContainerComponent>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

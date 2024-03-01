import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import LoginComponent from './components/LoginComponent';
import MainComponent from './components/MainComponent';
import ContainerComponent from './components/ContainerComponent';

const App = () => {

  const [code, setCode, eraseCode] = useLocalStorage("code");

  return <ContainerComponent>
    {!code ? <LoginComponent setCode={setCode} /> : <MainComponent code={code} eraseCode={eraseCode} />}
  </ContainerComponent>

};

export default App;


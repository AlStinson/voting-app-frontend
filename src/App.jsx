import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import LoginComponent from './components/LoginComponent';
import MainComponent from './components/MainComponent';

const App = () => {

  const [code, setCode, eraseCode] = useLocalStorage("code");

  return (
    <div>
      {!code ? <LoginComponent setCode={setCode} /> : <MainComponent code={code} eraseCode={eraseCode}  />}
    </div >
  );
};

export default App;


import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import LoginComponent from './components/LoginComponent';
import MainComponent from './components/MainComponent';

const App = () => {

  const [code, setCode, eraseCode] = useLocalStorage("code");

  if (!code) return <LoginComponent setCode={setCode} />;
  return <MainComponent code={code} eraseCode={eraseCode} />;


};

export default App;


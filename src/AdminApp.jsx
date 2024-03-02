import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import AdminLoginComponent from './components/AdminLoginComponent';
import AdminPanelsComponent from './components/AdminPanelsComponent';

const AdminApp = () => {

  const [token, setToken, eraseToken] = useLocalStorage("token");

  if (!token) return <AdminLoginComponent setToken={setToken} />;
  return <AdminPanelsComponent token={token} eraseToken={eraseToken} />;


};

export default AdminApp;


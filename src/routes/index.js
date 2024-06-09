import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

import Private from './Private';

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/cadastro" element={<Cadastro/>} />
      
      <Route path="/dashboard" element={ <Private><Dashboard/></Private>} />
      <Route path="/perfil" element={ <Private><Profile/></Private> }/>
    </Routes>
  );
}

export default RoutesApp;

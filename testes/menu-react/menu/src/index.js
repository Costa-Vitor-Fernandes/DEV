import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Menu from './Menu';
import Vagas from './vagas'
import Cadastro from './routes/cadastro.jsx';
import Login from './routes/login'
import Chatmenu from './routes/chatmenu';
import MeusFreelas from './routes/freela/meus-freelas';
import Avaliacao from './routes/avaliacao';
import Perfil from './routes/perfil';
import Chat from './routes/chat';
import LandingPage from "./routes/landing-page"
import LogMenu from "./LogMenu"




document.title = "JF Freelancer"

ReactDOM.render(
  
  <BrowserRouter>
  <Routes>
    <Route>
    <Route path="/" element={
    <div>
      <LogMenu />
    <LandingPage />
      </div>
     } />
    <Route path="/index" element={
    <div>
      <Menu />
    <Vagas />
      </div>
     } />
      <Route path="cadastro" element={
        <div>
        <Menu></Menu>  
        <Cadastro />
        </div>
      } />
      <Route path="login" element={
        <div>
        <Menu></Menu>
        <Login></Login>
        </div>
      
      } />
      <Route path="chatmenu" element={
        <div>
        <Menu></Menu>  
        <Chatmenu />
        </div>
      } />
      <Route path="meus-freelas" element={
        <div>
        <Menu></Menu>  
        <MeusFreelas />
        </div>
      } />
      <Route path="perfil" element={
        <div>
        <Menu></Menu>  
        <Perfil />
        </div>
      } />
      <Route path="avaliacao" element={
        <div>
        <Menu></Menu>  
        <Avaliacao />
        </div>
      } />
      <Route path="chat" element={
        <div>
        <Menu></Menu>  
        <Chat />
        </div>
      } />
    <Route
      path="*"
      element={
        <main >
          <Menu />
          <p style={{color: "black"}}>There's nothing here!</p>
        </main>
      }
      />
      </Route>
  </Routes>

  </BrowserRouter>
  ,
  document.getElementById('root')
);



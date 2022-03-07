import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Menu from './Menu';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Vagas from './vagas'
import Login from './routes/cadastro';
import Cadastro from './routes/cadastro';

ReactDOM.render(
  
  <BrowserRouter>
  <Routes>
    <Route>
    <Route path="/" element={
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
        <Login />
        </div>
      
      } />
    </Route>
    <Route
      path="*"
      element={
        <main >
          <Menu />
          <p style={{color: "black"}}>There's nothing here!</p>
        </main>
      }
    />
  </Routes>

  </BrowserRouter>
  ,
  document.getElementById('root')
);



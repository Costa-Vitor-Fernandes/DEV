import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Menu from './Menu';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Expenses from "./expenses";
import Invoices from "./invoices";
import Vagas from './vagas'

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
      <Route path="expenses" element={
        <div>
        <Menu></Menu>  
        <Expenses />
        </div>
      } />
      <Route path="invoices" element={<Invoices />} />
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



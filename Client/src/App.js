import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignUpPage';
import HomePage from './Pages/HomePage';
import EmployeeList from './Pages/EmployeeList';
import CreateEmployee from './Pages/CreateEmployee';
import EditEmployee from './Pages/EditEmployee';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/singup' element={<SignupPage/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/employeelist' element={<EmployeeList/>} />
        <Route path='/addemployee' element={<CreateEmployee/>} />
        <Route path='/editemployee/:id' element={<EditEmployee/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

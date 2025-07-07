import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import UserIndex from './components/UserIndex'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserIndexSwr from './components/UserIndesSwr';

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="row gap-3">
          <Link to="/users">Users without SWR</Link>
          <Link to="/users-swr">Users With SWR</Link>
        </div>
        <Routes>
          <Route path='/users' element={<UserIndex />} />
          <Route path='/users-swr' element={<UserIndexSwr />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

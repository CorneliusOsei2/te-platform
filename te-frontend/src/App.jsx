import './App.css';
import Workspace from './components/user/Workspace'
import { AuthProvider } from './context/AuthContext'
import Login from './components/user/Login';
import { useState, useEffect, useCallback } from 'react'
import Home from './components/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from './context/DataContext'
import Register from './components/user/Register';

function App() {
  const [login, setLogin] = useState(false)

  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <div className="App gentium-book">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workspace" element={<Workspace setLogin={setLogin} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </DataProvider>
      </AuthProvider >
    </BrowserRouter>
  );
}

export default App;

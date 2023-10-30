import './App.css';
import CompanyHome from './components/company/CompanyHome';
import Workspace from './components/user/Workspace'
import { AuthProvider } from './components/AuthContext'
import Login from './components/user/Login';
import { useState } from 'react'
import Home from './components/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [login, setLogin] = useState(false)

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workspace" element={<Workspace setLogin={setLogin} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider >
  );
}

export default App;

import './App.css';
import Workspace from './components/user/Workspace'
import { AuthProvider } from './context/AuthContext'
import Login from './components/user/Login';
import { useState } from 'react'
import Home from './components/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from './context/DataContext'

function App() {
  const [login, setLogin] = useState(false)

  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workspace" element={<Workspace setLogin={setLogin} />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </DataProvider>
      </AuthProvider >
    </BrowserRouter>
  );
}

export default App;

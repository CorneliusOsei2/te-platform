import './App.css';
import Workspace from './components/user/Workspace'
import Home from './components/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from './context/DataContext'

function App() {

  return (
    <BrowserRouter>
      <DataProvider>
        <div className="App gentium-book">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workspace" element={<Workspace />} />
          </Routes>
        </div>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;

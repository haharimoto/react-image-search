import './App.css';
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';
import Error from './components/pages/Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='favorites' element={<Favorites />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

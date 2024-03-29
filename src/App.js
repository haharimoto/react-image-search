import './App.css';
import Main from './components/Main';
import Search from './components/pages/Search'
import Favorites from './components/pages/Favorites';
import Error from './components/pages/Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SkeletonTheme } from 'react-loading-skeleton';
import { useDarkMode } from './components/Navbar';



function App() {
  const darkMode = useDarkMode(state => state.darkMode)
  let style
  if (darkMode === 'light') {
    style = 'wrapper'
  } else {
    style = 'wrapper-dark'
  }

  return (
    <div className={style}>
      <SkeletonTheme baseColor="#808080" highlightColor="#b1b1b1">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='search' element={<Search />} />
            <Route path='favorites' element={<Favorites />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </div>
  );
}

export default App;

// testing

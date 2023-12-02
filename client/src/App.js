import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import NavBar from './NavBar';

function App() {
  return (
    <BrowserRouter>
    <div>
      <NavBar />
        <div className='app'>
          {/* <NavBar user={user} />  */}
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>
    </div>
  </BrowserRouter>
  );
}

export default App;

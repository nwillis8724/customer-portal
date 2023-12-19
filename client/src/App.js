import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import About from './About';
import CustomerSearch from './CustomerSearch';
import NavBar from './NavBar';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import MyJobs from './MyJobs';
import AddEmployee from './AddEmployee';
import AddDoor from './AddDoor';


function App() {
  const {user, setUser} = useContext(UserContext)
  const [jobArray, setJobArray] = useState([])
  const [doorsLoaded, setDoorsLoaded] = useState(false)

  useEffect(() => {
    fetch("/jobs")
      .then((r) => r.json())
      .then((jobs) => setJobArray(jobs));
  }, []);

  function updateJobArray(newJob) {
    setJobArray((prevJobArray) => [...prevJobArray, newJob]);
  };

  // console.log(jobArray)

  return (
    <BrowserRouter>
    <div>
      <NavBar />
        <div className='app'>
          <Routes>
            <Route
              path="/"
              element={<Home jobArray={jobArray}/>}
            />
            <Route
              path="/about"
              element={<About />}
            />
            <Route
              path="/jobs/:id"
              element={<CustomerSearch jobArray={jobArray} setJobArray={setJobArray} setDoorsLoaded={setDoorsLoaded} doorsLoaded={doorsLoaded}/>}
            />     
            <Route
              path="/login"
              element={<Login />}
            />     
            <Route
              path="/adddoor"
              element={<AddDoor jobArray={jobArray} updateJobArray={updateJobArray} />}
            />
            <Route
              path="/addemployee"
              element={<AddEmployee />}
            />
            <Route
              path="/myjobs"
              element={<MyJobs jobArray={jobArray} />}
            />                 
          </Routes>
        </div>
    </div>
  </BrowserRouter>
  );
}

export default App;

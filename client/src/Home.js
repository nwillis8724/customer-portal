import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RaynorLogo from './images/raynorlogo.png'
import { JobContext } from "./contexts/JobContext";


function Home({jobArray}){
    const { jobSelected, setJobSelected } = useContext(JobContext);
    const[accesCode, setAccessCode] = useState("")
    const[error, setError] = useState("")
    const navigate = useNavigate(); 

    function findDoor(e){
        e.preventDefault()
         const trimmedAccessCode = accesCode.trim();

  if (trimmedAccessCode) {
    const foundJob = jobArray.find((job) => job.access_code === trimmedAccessCode);

        if (foundJob) {
            setJobSelected(foundJob);
            navigate(`/jobs/${foundJob.id}`);
        } else {
            setError("Invalid Access Code");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }

    }
 return (
    <div>
        <div>
            <  img className="raynor-logo" src={RaynorLogo} alt="Raynor Logo" />
        </div>
        <div>
            
        </div>
        <div className="door-finder">
            <form className="door-finder-form" onSubmit={(e) => findDoor(e)}>
            {error ? <p className="error_code">{error}</p> : null}
                <h2>Find Your Door</h2>
                <input type="text" placeholder="Enter access code" value={accesCode} onChange={(e) => setAccessCode(e.target.value)} />
                <button type="submit">Search</button>
            </form>
        </div>
    </div>
 )
}

export default Home
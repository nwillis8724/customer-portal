import React, {useContext} from "react";
import { UserContext } from './contexts/UserContext';
import { NavLink } from "react-router-dom";


function MyJobs(){
  const {user, setUser} = useContext(UserContext)

    if (!user) 
        return (
            <div><h1>Loading...</h1></div>
        )
    return(
        <div>
        <h1>MyJobs</h1>
            <div className="admin_job_card">
                {user.jobs.map((job, i) =>{
                    return(
                        <NavLink to={`/jobs/${job.id}`} key={i} style={{ textDecoration: "none", color: "black" }} className="job-card-link">
                        <div key={i} className="job-card">
                            <h3>{job.access_code}</h3>
                            <p>Address: {job.address}</p>
                            <p>Install Date: {job.date_of_install}</p>
                            
                        </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default MyJobs

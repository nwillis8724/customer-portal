import React, {useContext} from "react";
import { UserContext } from './contexts/UserContext';


function MyJobs({jobArray}){
  const {user, setUser} = useContext(UserContext)
    console.log(user)
  console.log(jobArray)

  let adminsJobs = jobArray.filter((job) => {
    return job.job_admin && job.job_admin.filter((admin) => admin.id === user.id).length > 0;
  });
    console.log(adminsJobs);
    return(
        <div>
        <h1>MyJobs</h1>
            <div className="admin_job_card">
                {adminsJobs.map((job, i) =>{
                    return(
                        <div key={i} className="job-card">
                            <h3>{job.access_code}</h3>
                            <p>Address: {job.address}</p>
                            <p>Install Date: {job.date_of_install}</p>
                            {job.doors.map((door, i) =>{
                                return(
                                <div className="door-card" key={i}>
                                    <p>Model: {door.model}</p>
                                    <p>Size: {door.size}</p>
                                    <p>Color: {door.color}</p>
                                    <p>Arrival: {door.date_of_arrival}</p>
                                </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyJobs

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
                            <p>{job.access_code}</p>
                            <p>{job.address}</p>
                            <p>{job.date_of_install}</p>
                            {job.doors.map((door, i) =>{
                                return(
                                <div className="door-card" key={i}>
                                    <p>{door.model}</p>
                                    <p>{door.size}</p>
                                    <p>{door.color}</p>
                                    <p>{door.date_of_arrival}</p>
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

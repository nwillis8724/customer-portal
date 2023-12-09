import React, { useState, useContext } from "react";
import { UserContext } from './contexts/UserContext';


function AddDoor({jobArray}) {
  const {user, setUser} = useContext(UserContext)
  const [partOfJob, setPartOfJob] = useState(false);
  const [model, setModel] = useState("")
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")
  const [doa, setDoa] = useState("")
  const [doi, setDoi] = useState("")
  const [accessCode, setAccessCode] = useState("")
  const [address, setAddress] = useState("")
  const [jobId, setJobId] = useState(null)
  const [newJob, setNewJob] = useState(null)
  const [adminJobJoinData, setAdminJobJoinData] = useState(null)
  // console.log(jobArray)

  function handleSelect(e) {
    e.preventDefault();
    setPartOfJob(!partOfJob);
  }

  function handleAddDoor(e) {
    e.preventDefault();
  
    const doorData = {
      model,
      size,
      color,
      date_of_arrival: doa,
      admin_id: user.id
    };
  
    const jobData = {
      address: address,
      date_of_install: doi,
      access_code: accessCode,
      admin_id: user.id,
      doors: []
    };
  
    if (partOfJob) {
      const jobSelected = jobArray.find((job) => job.access_code === accessCode);
      const selectedJobId = jobSelected.id;
      updateExistingJob(selectedJobId, jobData);
    } else {
      console.log('Job data',jobData)
      createNewJob(jobData, doorData);
    }
  }
  
  function updateExistingJob(jobId, doorData) {
    fetch(`/jobs/${jobId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doorData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Job updated successfully', data);
      })
      .catch(error => {
        console.error('Error updating job', error);
      });
  }
  

  function createNewJob(jobData, doorData) {
    fetch('/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('New Job created successfully', data);
        setNewJob(data)
        setJobId(data.id)
        const doorWithJobId = { ...doorData, job_id: data.id };
        createNewDoor(doorWithJobId);
      })
      .catch(error => {
        console.error('Error creating new job', error);
      });
  }


  function createNewDoor(doorWithJobId) {
    fetch('/doors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doorWithJobId),
    })
      .then(response => response.json())
      .then(data => {
        console.log('New door created successfully', data);
        const updatedAdminJobJoinData = {
          admin_job: {
            admin_id: user.id,
            job_id: data.job_id,
          },
        };
        setAdminJobJoinData(updatedAdminJobJoinData);

      adminJobJoin(updatedAdminJobJoinData);
      })
      .catch(error => {
        console.error('Error creating new door', error);
      });
  }

  function adminJobJoin(adminJobJoinData){
    fetch('/admin_jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminJobJoinData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('New adminJob created successfully', data);
      })
      .catch(error => {
        console.error('Error creating new door', error);
      });
  }

  return (
    <div className="add-door-container">
      <div className="form-container">
        <h3> Add a new Door</h3>
        <form className="main-form" onSubmit={(e) => handleAddDoor(e)}>
          <input placeholder="model" className="input-field" value={model} onChange={(e) => setModel(e.target.value)}></input>
          <input placeholder="size" className="input-field" value={size} onChange={(e) => setSize(e.target.value)}></input>
          <input placeholder="color" className="input-field" value={color} onChange={(e) => setColor(e.target.value)}></input>
          <input placeholder="Date of Arrival" className="input-field" value={doa} onChange={(e) => setDoa(e.target.value)}></input>
          <p>Is this part of an existing job?</p>
          <select onChange={(e) => handleSelect(e)}className="select-field">
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
          {partOfJob ? (
            <div className="nested-form">
              <input placeholder="access code" className="input-field" value={accessCode} onChange={(e) => setAccessCode(e.target.value)}></input>
              <button className="submit-button">Submit</button>
            </div>
          ) : (
            <div className="nested-form">
              <input placeholder="address" className="input-field" value={address} onChange={(e) => setAddress(e.target.value)}></input>
              <input placeholder="date of install" className="input-field" value={doi} onChange={(e) => setDoi(e.target.value)}></input>
              <input placeholder="access code" className="input-field" value={accessCode} onChange={(e) => setAccessCode(e.target.value)}></input>
              <button className="submit-button">Submit</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddDoor;

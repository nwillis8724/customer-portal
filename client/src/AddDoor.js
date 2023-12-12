import React, { useState, useContext, useEffect } from "react";
import { UserContext } from './contexts/UserContext';


function AddDoor({jobArray, updateJobArray}) {
  const {user, setUser} = useContext(UserContext)
  const [partOfJob, setPartOfJob] = useState(false);
  const [model, setModel] = useState("")
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")
  const [doa, setDoa] = useState("")
  const [doi, setDoi] = useState("")
  const [accessCode, setAccessCode] = useState("")
  const [address, setAddress] = useState("")
  const [jobId, setJobId] = useState("")
  const [updatedJob, setUpdatedJob] = useState("")
  // console.log(jobArray)
  // console.log(user)

  useEffect(() => {
    if (user) {
      console.log("User data:", user);
    }
  }, [user]);

  function handleSelect(e) {
    e.preventDefault();
    setPartOfJob(!partOfJob);
  }

  function onSubmitHandler(e){
    e.preventDefault()
    const doorData = {
      model,
      size,
      color,
      date_of_arrival: doa,
      admin_id: user.id
    };

    partOfJob ? updateExistingJob(doorData) : handleAddDoor(doorData)
    setModel("")
    setSize("")
    setColor("")
    setDoa("")
    setDoi("")
    setAccessCode("")
    setAddress("")
  }

  function handleAddDoor(doorData) {
  
    const jobData = {
      address: address,
      date_of_install: doi,
      access_code: accessCode,
      admin_id: user.id,
      doors: []
    };
  
      console.log('Job data',jobData)
      createNewJob(jobData, doorData);

  }

  function updateExistingJob(doorData) {
    const jobSelected = jobArray.find((job) => job.access_code === accessCode);
  
    const newDoor = { ...doorData, job_id: jobSelected.id };
  
    fetch(`/doors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDoor),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Door added successfully', data);
        const associatedJob = jobArray.find((job) => job.id === data.job_id)
        associatedJob.doors = [...associatedJob.doors, doorData];
          setUpdatedJob(associatedJob)
      })
      .catch(error => {
        console.error('Error adding door', error);
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
        const doorWithJobId = { ...doorData, job_id: data.id };
        data.doors = [doorWithJobId]
        createNewDoor(doorWithJobId);
        updateJobArray(data);
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
          }
        };
      adminJobJoin(updatedAdminJobJoinData);
      const associatedJob = jobArray.find((job) => job.id === data.job_id)
      const updatedJobDoor = {
        ...associatedJob,
        doors: [...associatedJob.doors, data],
      };
      setUpdatedJob(updatedJobDoor)
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
        <form className="main-form" onSubmit={(e) => onSubmitHandler(e)}>
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

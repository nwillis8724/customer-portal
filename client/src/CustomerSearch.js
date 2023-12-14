import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from './contexts/UserContext';


function CustomerSearch({jobSelected, setJobSelected}){
    // console.log(jobSelected)
  const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();
    const [doorNotes, setDoorNotes] = useState({});
    const [errors, setErrors] = useState("")
    const [editMode, setEditMode] = useState(true)

    function handleEditNote(note){
        console.log(note)
    }

    function handleDeleteNote(note) {
      console.log(note);
    
      fetch(`/notes/${note.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Note ${note.id} deleted successfully`);
    
            setJobSelected((prevJob) => {
              const newDoors = prevJob.doors.map((door) => ({
                ...door,
                door_notes: door.door_notes.filter((n) => n.id !== note.id),
              }));
    
              const newJob = {
                ...prevJob,
                doors: newDoors,
              };
    
              console.log("New Job Selected State:", newJob);
    
              return newJob;
            });
          } else {
            response.json().then((data) => {
              setErrors(data.errors);
    
              setTimeout(() => {
                setErrors([]);
              }, 5000);
            });
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }

    function handleNewDoorNote(e, door) {
        const doorId = door.id
        e.preventDefault();
        console.log(doorNotes[doorId])
      
        const newNote =
        {
            note: doorNotes[doorId],
            job_id: door.job_id,
            door_id: doorId,
            admin_id: user ? user.id : null,

          };
      
        fetch("/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({note: newNote}),
        })
          .then((response) => {
            if (response.ok) {
                console.log(`Note for door ${doorId} submitted: ${doorNotes[doorId]}`);

              setDoorNotes((prevNotes) => ({
                ...prevNotes,
                [doorId]: "",
              }));
            } else {
              response.json().then((data) => {
                setErrors(data.errors);
      
                setTimeout(() => {
                  setErrors([]);
                }, 5000);
              });
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
          });
      }

    useEffect(() => {
        if (!jobSelected.doors || jobSelected.doors.length === 0) {
          navigate("/");
        }
      }, [jobSelected.doors, navigate]);

    return(
        <div>
            <div className="job-selected-container">
                <h1>{jobSelected.address}</h1>
                <p>Estimated Date of Install: {jobSelected.date_of_install}</p>
                <div className="job-notes">
                    {jobSelected.job_notes ?
                        jobSelected.job_notes.map((note, i) => {
                            return (
                            <div key={i}>
                                <button className="edit_button" onClick={(e) => handleEditNote(note)}>🖉</button>
                                <button className="delete_button" onClick={(e) => handleDeleteNote(note)}>🗑️</button>
                                <p>{note.note}</p>
                            </div>
                        )})
                        : null}
                </div>
                <div>
                    <form>
                        <input placeholder="Add Note"></input>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
            <div className="door-info-grid">
                {jobSelected.doors &&
                jobSelected.doors.map((door, i) =>{
                    // console.log(door.door_notes)
                    return(
                        <div className="door-info-container" key={i}>
                            <p>Model: {door.model}</p>
                            <p>Size: {door.size}</p>
                            <p>Color: {door.color}</p>
                            <p>Date of Arrival: {door.date_of_arrival}</p>
                            <div>
                            {door.door_notes ? 
                                door.door_notes.map((note, i) => {
                            // console.log(note)
                            return (
                            <div key={i}>
                                <div className="door_notes">
                                    <button className="edit_button" onClick={(e) => handleEditNote(note)}>🖉</button>
                                    <button className="delete_button" onClick={(e) => handleDeleteNote(note)}>🗑️</button>
                                    <p>{note.note}</p>
                                </div>
                            </div>
                        )})
                        : null}
                            <div>
                                <form onSubmit={(e) => handleNewDoorNote(e, door)}>
                                    <input placeholder="New comment..." value={doorNotes[door.id] || ""}
                                    onChange={(e) => setDoorNotes({ ...doorNotes, [door.id]: e.target.value })}>
                                    </input>
                                    <button>Submit</button>
                                </form>
                            </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default CustomerSearch
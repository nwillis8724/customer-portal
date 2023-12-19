import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from './contexts/UserContext';
import { JobContext } from "./contexts/JobContext";


function CustomerSearch({jobArray, setJobArray}){
    const { jobSelected, setJobSelected } = useContext(JobContext);
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();
    const [doorNotes, setDoorNotes] = useState({});
    const [errors, setErrors] = useState("")
    const [editMode, setEditMode] = useState(null)
    const [updatedNote, setUpdatedNote] = useState("")
    
    // make this use useParams using route for customer search
    let {id} = useParams();

    setJobSelected(jobArray.find((job) => job.id === parseInt(`${id}`)))


    function handleEditNote(note) {
      console.log(note);
      setUpdatedNote(note.note);
      setEditMode((prevEditMode) => (prevEditMode === note.id ? null : note.id));
    }

    function handleUpdateNote(e, note) {
      console.log("note to update", note)
      e.preventDefault();
    
      fetch(`/notes/${note.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           note: {
             note: updatedNote, 
             job_id: note.job_id,
             door_id: note.door_id
            }
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            response.json().then((data) => {
              setErrors(data.errors);
    
              setTimeout(() => {
                setErrors([]);
              }, 5000);
            });
            throw new Error("Note update failed");
          }
        })
        .then((newNoteFromServer) => {

          setJobArray((prevJobs) => {
            const newJobs = prevJobs.map((job) => {
              const newDoors = job.doors.map((door) => {
                if (door.id === newNoteFromServer.door_id) {
                  const existingNote = door.notes.find((n) => n.id === newNoteFromServer.id);
                  if (existingNote) {
                    const updatedNotes = door.notes.map((n) =>
                      n.id === newNoteFromServer.id ? newNoteFromServer : n
                    );
                    return {
                      ...door,
                      notes: updatedNotes,
                    };
                  }
                }
                return door;
              });
    
              return {
                ...job,
                doors: newDoors,
              };
            });
    
            return newJobs;
          });
          setEditMode(null);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }

    
    function deleteConfirmation(note) {
      const isConfirmed = window.confirm("Are you sure you want to delete this note?");
  
      if (isConfirmed) {
        handleDeleteNote(note);
      }
    }

    function handleDeleteNote(note) {
    
      fetch(`/notes/${note.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Note ${note.id} deleted successfully`);
    
            setJobArray((prevJobs) => {
              const newJobs = prevJobs.map((job) => {
                const newDoors = job.doors.map((door) => ({
                  ...door,
                  notes: door.notes.filter((n) => n.id !== note.id),
                }));
    
                return {
                  ...job,
                  doors: newDoors,
                };
              });
    
              return newJobs;
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
      const doorId = door.id;
      e.preventDefault();
    
      const newNote = {
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
        body: JSON.stringify({ note: newNote }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            response.json().then((data) => {
              setErrors(data.errors);
    
              setTimeout(() => {
                setErrors([]);
              }, 5000);
            });
            throw new Error("Note creation failed");
          }
        })
        .then((newNoteFromServer) => {
          console.log(`Note for door ${doorId} submitted: ${doorNotes[doorId]}`);
    
          setJobArray((prevJobs) => {
            const newJobs = prevJobs.map((job) => {
              const newDoors = job.doors.map((door) => {
                if (door.id === newNoteFromServer.door_id) {
                  return {
                    ...door,
                    notes: [...door.notes, newNoteFromServer],
                  };
                }
                return door;
              });
    
              return {
                ...job,
                doors: newDoors,
              };
            });
    
            return newJobs;
          });
    
          setDoorNotes((prevNotes) => ({
            ...prevNotes,
            [doorId]: "",
          }));
        })
        
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }

    // useEffect(() => {
    //     if (!jobSelected.doors || jobSelected.doors.length === 0) {
    //       navigate("/");
    //     }
    //   }, [jobSelected.doors, navigate]);

    return(
        <div>
          {errors ? <p>error</p> :
          null}
            <div className="job-selected-container">
                <h1>{jobSelected.address}</h1>
                <p>Estimated Date of Install: {jobSelected.date_of_install}</p>
            </div>
            <div className="door-info-grid">
                {jobSelected.doors &&
                jobSelected.doors.map((door, i) =>{
                    return(
                        <div className="door-info-container" key={i}>
                            <p>Model: {door.model}</p>
                            <p>Size: {door.size}</p>
                            <p>Color: {door.color}</p>
                            <p>Date of Arrival: {door.date_of_arrival}</p>
                            <div>
                            {door.notes ? 
                                door.notes.map((note, i) => {
                            return (
                            <div key={i}>
                                <div className="door_notes">
                                {user && (
                                  <>
                                    <button className="edit_button" onClick={(e) => handleEditNote(note)}>
                                      🖉
                                    </button>
                                    <button className="delete_button" onClick={(e) => deleteConfirmation(note)}>
                                      🗑️
                                    </button>
                                  </>
                                )}
                                    {editMode === note.id ? (
                                      <form onSubmit={(e) => handleUpdateNote(e, note)}>
                                        <input value={updatedNote} onChange={(e) => setUpdatedNote(e.target.value)}></input>
                                        <button>Update</button>
                                      </form>
                                    ) : (
                                      <>
                                      <p>{note.note}</p>
                                      <p>Posted By: {note.poster_name}</p>
                                      </>
                                    )}
                                </div>
                            </div>
                        )})
                        : null}
                            <div>
                                <form onSubmit={(e) => handleNewDoorNote(e, door)}>
                                    <input placeholder="New note..." value={doorNotes[door.id] || ""}
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
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from './contexts/UserContext';


function CustomerSearch({jobSelected, setJobSelected}){
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();
    const [doorNotes, setDoorNotes] = useState({});
    const [errors, setErrors] = useState("")
    const [editMode, setEditMode] = useState(null)
    const [updatedNote, setUpdatedNote] = useState("")



    function handleEditNote(note){
        console.log(note)
        setUpdatedNote(note.note)
        setEditMode((prevEditMode) => (prevEditMode === note.door_id ? null : note.door_id));
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
          console.log("newNoteFromServe", newNoteFromServer)

          setJobSelected((prevJob) => {
            const newDoors = prevJob.doors.map((door) => {
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
              ...prevJob,
              doors: newDoors,
            };
          });
          setEditMode(null)
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
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
    
            setJobSelected((prevJob) => {
              const newDoors = prevJob.doors.map((door) => ({
                ...door,
                notes: door.notes.filter((n) => n.id !== note.id),
              }));
    
              const newJob = {
                ...prevJob,
                doors: newDoors,
              };
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
    
          setJobSelected((prevJob) => {
            const newDoors = prevJob.doors.map((door) => {
              if (door.id === newNoteFromServer.door_id) {
                return {
                  ...door,
                  notes: [...door.notes, newNoteFromServer],
                };
              }
              return door;
            });
    
            return {
              ...prevJob,
              doors: newDoors,
            };
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

    useEffect(() => {
        if (!jobSelected.doors || jobSelected.doors.length === 0) {
          navigate("/");
        }
      }, [jobSelected.doors, navigate]);

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
                  console.log(door)
                    return(
                        <div className="door-info-container" key={i}>
                            <p>Model: {door.model}</p>
                            <p>Size: {door.size}</p>
                            <p>Color: {door.color}</p>
                            <p>Date of Arrival: {door.date_of_arrival}</p>
                            <div>
                            {door.notes ? 
                                door.notes.map((note, i) => {
                            // console.log(note)
                            return (
                            <div key={i}>
                                <div className="door_notes">
                                    <button className="edit_button" onClick={(e) => handleEditNote(note)}>🖉</button>
                                    <button className="delete_button" onClick={(e) => handleDeleteNote(note)}>🗑️</button>
                                    {editMode === note.door_id ? (
                                      <form onSubmit={(e) => handleUpdateNote(e, note)}>
                                        <input value={updatedNote} onChange={(e) => setUpdatedNote(e.target.value)}></input>
                                        <button>Update</button>
                                      </form>
                                    ) : (
                                      <p>{note.note}</p>
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
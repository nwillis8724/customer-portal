import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CustomerSearch({jobSelected}){
    console.log(jobSelected)
    const navigate = useNavigate();

    function handleEditNote(note){
        console.log(note)
    }

    function handleDeleteNote(note){
        console.log(note)
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
                            // console.log(note)
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
                            <div className="door_notes" key={i}>
                                <button className="edit_button" onClick={(e) => handleEditNote(note)}>🖉</button>
                                <button className="delete_button" onClick={(e) => handleDeleteNote(note)}>🗑️</button>
                                <p>{note.note}</p>
                            </div>
                        )})
                        : null}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default CustomerSearch
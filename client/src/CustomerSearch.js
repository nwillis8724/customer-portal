import React, { useState, useEffect } from "react";

function CustomerSearch({jobSelected, setJobSelected}){

    return(
        <div>
            <div className="job-selected-container">
                <h1>{jobSelected.address}</h1>
                <p>Estimated Date of Install: {jobSelected.date_of_install}</p>
                <div className="job-notes">
                    {jobSelected.job_notes
                        ? jobSelected.job_notes.map((note, index) => (
                            <div key={index}>
                                <p>{note.note}</p>
                            </div>
                        ))
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
                {jobSelected.doors.map((door) =>{
                    console.log(door.door_notes)
                    return(
                        <div className="door-info-container">
                            <p>Model: {door.model}</p>
                            <p>Size: {door.size}</p>
                            <p>Color: {door.color}</p>
                            <p>Date of Arrival: {door.date_of_arrival}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default CustomerSearch
import React, { useState } from "react";

function AddDoor() {
  const [partOfJob, setPartOfJob] = useState(false);

  function handleSelect(e) {
    e.preventDefault();
    setPartOfJob(!partOfJob);
  }

  return (
    <div className="add-door-container">
      <div className="form-container">
        <form className="main-form">
          <input placeholder="model" className="input-field"></input>
          <input placeholder="size" className="input-field"></input>
          <input placeholder="color" className="input-field"></input>
          <input
            placeholder="date_of_arrival"
            className="input-field"
          ></input>
          <p>Is this part of an existing job?</p>
          <select
            onChange={(e) => handleSelect(e)}
            className="select-field"
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
          {partOfJob ? (
            <div className="nested-form">
              <input placeholder="access code" className="input-field"></input>
              <button className="submit-button">Submit</button>
            </div>
          ) : (
            <div className="nested-form">
              <input placeholder="address" className="input-field"></input>
              <input
                placeholder="date of install"
                className="input-field"
              ></input>
              <input placeholder="access code" className="input-field"></input>
              <p>Is this part of an existing job?</p>
              <button className="submit-button">Submit</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddDoor;

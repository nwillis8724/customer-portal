import React, { useState, useEffect } from "react";

function AddEmployee(){
    return(
        <div>
            <div className="employee_form_card">
                <h1>Add an Employee</h1>
                <form className="employee_form">
                    <input placeholder="position"></input>
                    <input placeholder="username"></input>
                    <input placeholder="password"></input>
                    <input placeholder="confirm password"></input>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee
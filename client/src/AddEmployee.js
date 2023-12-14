import React, { useState } from "react";

function AddEmployee(){
    const [position, setPosition] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState("")

    function handleAddEmployee(e){
        e.preventDefault()
        const newEmployee = {
            admin: {
                username: username,
                password: password,
                password_confirmation: passwordConfirmation,
                position: position
              }
        }

        fetch("/admins", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployee),
          })
            .then((response) => {
              if (response.ok) {
                window.location.reload();
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
    return(
        <div>
            <div className="employee_form_card">
                <h1>Add an Employee</h1>
                <form className="employee_form" onSubmit={(e) => handleAddEmployee(e)}>
                    <input placeholder="position" value={position} onChange={(e) => setPosition(e.target.value)}></input>
                    <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <input placeholder="confirm password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee
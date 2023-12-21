import React, { useState } from "react";

function AddEmployee(){
    const [position, setPosition] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState("")
    const [confirmation, setConfirmation] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [email, setEmail] = useState("")

    function handleAddEmployee(e){
        e.preventDefault()
        const newEmployee = {
            admin: {
                username: username,
                password: password,
                password_confirmation: passwordConfirmation,
                position: position,
                image_url: imageUrl,
                email: email
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
            if (!response.ok) {
              return response.json().then((data) => {
                console.log('Validation errors:', data.errors);
                const formattedErrors = data.errors.map((error) => `- ${error}`).join("\n");
                setErrors(formattedErrors);
        
                setTimeout(() => {
                  setErrors("");
                }, 5000);
              });
            } else {
              setConfirmation("Employee Added!")
              
              setTimeout(() => {
                setConfirmation("");
              }, 5000);

              setPosition("")
              setUsername("")
              setPassword("")
              setImageUrl("")
              setEmail("")
              setPasswordConfirmation("")
            }
          })
        }
    return(
        <div>
            <div className="employee_form_card">
                <h1>Add an Employee</h1>
                <form className="employee_form" onSubmit={(e) => handleAddEmployee(e)}>
                    <input placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)}></input>
                    <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <input placeholder="Bio Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}></input>
                    <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <input placeholder="Confirm Password" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
                    <button>Submit</button>
                </form>
                {confirmation ? <p className="confirmation_text">{confirmation}</p> : null}
                {errors ? <p className="error_code">{errors}</p> : null}
            </div>
        </div>
    )
}

export default AddEmployee
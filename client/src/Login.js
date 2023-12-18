import React, { useState, useContext } from "react";
import { UserContext } from './contexts/UserContext';
import { useNavigate } from "react-router-dom";
import RaynorLogo from './images/raynorlogo.png'



function Login({ onLogin }) {
    const {user, setUser} = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate()


    function loginUser(e) {
        e.preventDefault();
    
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })
        .then((r) => {
            if (r.status === 401) {
              r.json().then((data) => {
                setErrors([data.error]);

                setTimeout(() => {
                  setErrors("");
                }, 5000);
              });
            } else if (!r.ok) {
                r.json().then((data) => {
                  const formattedErrors = data.errors.map((error) => `- ${error}`).join("\n");
                  setErrors(formattedErrors);
    
                    setTimeout(() => {
                      setErrors("");
                    }, 5000);
                  });
            } else {
              r.json().then((response) => {
                setUser(response);
                setUsername("")
                setPassword("")
                navigate('/')
              });
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }

    return (
      <div>
        <div className="login_container">
            <div className="login_card">
                <form onSubmit={loginUser}>
                    <h2>Log In</h2>
                    <input className="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="user"></input>
                    <input className="password" value ={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"></input>
                    <button>Login</button>
                </form>
                {errors ? <p className="error_code">{errors}</p> : null}
            </div>
        </div>
      </div>
    )
}

export default Login


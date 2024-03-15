import React, { useState } from "react";
import Account from './components/Account';
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onLogin = (event) => {
        let acc = new Account(); 
        acc.checkLogin(username, password);
        console.log(username + " " + password);
        navigate("../")
    }

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

//const submit = (event) 
    return (
        <div>
            <h2>Login</h2>
            <form>
                <div>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={handleUsername} />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input type="text" value={password} onChange={handlePassword} /> 
                    </label>
                    
                </div>
            </form>
            <button onClick={onLogin}>Submit</button>
        </div>
    )
}

export default Login;
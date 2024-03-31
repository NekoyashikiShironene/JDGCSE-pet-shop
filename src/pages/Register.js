import React, {useState} from "react";
import Account from '../classes/Account.mjs'

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [DOB, setDOB] = useState("");
    const [Email, setEmail] = useState("");
    const [Tel, setTel] = useState("");

    const onRegister = (event) => {
        let Acc = Register(username, password, name, DOB, Email, Tel);
    }

    const handleUsername = (event) => {

    }

    const handlePassword = (event) => {
        
    }

    return (
        <div>
            <h2>Register</h2>
            <form>
                <div>
                    <label>
                        Username:
                        <input type="text"></input>
                    </label><br/>
                    <label>
                        Password:
                        <input type="text"></input>
                    </label><br/>
                    <label>
                        Name:
                        <input type="text"></input>
                    </label><br/>
                    <label>
                        Date of Birth:
                        <input type="text"></input>
                    </label><br/>
                    <label>
                        Email:
                        <input type="text"></input>
                    </label><br/>
                    <label>
                        Tel.:
                        <input type="text"></input>
                    </label><br/>
                </div>
            </form>
            <button onClick={onRegister}>submit</button>
        </div>
    )
}

export default Register;
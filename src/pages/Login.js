import React, { useState } from "react";
import Account from '../classes/Account.mjs';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.js";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { isLoggedIn, setIsLoggedIn, account, setAccount } = useAuth();
    const navigate = useNavigate();

    const onLogin = (event) => {
        setIsLoggedIn(true);
        navigate("/");
    }

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

//const submit = (event) 
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '500px', height: '350px' }}>
                <Card.Body>
                    <Card.Title style={{textAlign: 'center', fontSize: '30px'}}>Login</Card.Title>
                    <Form onSubmit={onLogin}>
                        <Form.Group controlId="formBasicUsername" className="mt-3">
                            <Form.Label style={{fontSize: '18px'}} >Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsername}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mt-3">
                            <Form.Label style={{fontSize: '18px'}}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit" block className="mt-3">
                            Login
                        </Button>
                    </Form>
                    Don't have an account? <Card.Link href="/register">Sign up</Card.Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Login;
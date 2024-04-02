import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Account from '../classes/Account.mjs'
import { useNavigate } from "react-router-dom";
import AccountManager from "../classes/AccountManager.mjs";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [Loc, setLoc] = useState("");
    const [Email, setEmail] = useState("");
    const [Tel, setTel] = useState("");

    const navigate = useNavigate();

    const onRegister = (event) => {
        event.preventDefault();
        const createAcc = async () => {
            const am = new AccountManager();
            try {
                const response = await am.createCustomerAccount(username, password, name, Email, Tel, Loc);
                console.log("ok");
                navigate("/login");
            } catch (error) {
                console.error("Error creating account:", error);
                alert(error.message);
            }  
        }
        createAcc();
        return () => {};
    }
    

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);

    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleLoc = (event) => {
        setLoc(event.target.value);

    }

    const handleTel = (event) => {
        setTel(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Card style={{ width: '500px', height: '700px' }}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', fontSize: '30px' }}>Register</Card.Title>
                        <Form onSubmit={onRegister}>
                            <Form.Group controlId="formBasicUsername" className="mt-3">
                                <Form.Label style={{ fontSize: '18px' }}>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsername} pattern="" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="mt-3">
                                <Form.Label style={{ fontSize: '18px' }}>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} pattern="" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicName" className="mt-3">
                                <Form.Label style={{ fontSize: '18px' }}>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleName} pattern="" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className="mt-3">
                                <Form.Label style={{ fontSize: '18px' }}>Email</Form.Label>
                                <Form.Control type="tel" placeholder="Enter email" value={Email} onChange={handleEmail} pattern="[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})" required />
                            </Form.Group>

                            <Form.Group controlId="formBasiLocation" className="mt-3">
                                <Form.Label style={{ fontSize: '18px' }}>Address</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter address" value={Loc} onChange={handleLoc} pattern=""required />
                            </Form.Group>

                            <Form.Group controlId="formBasicTel" className="mt-3">
                                <Form.Label style={{ fontSize: '18px' }}>Tel.</Form.Label>
                                <Form.Control type="text" placeholder="Enter tel" value={Tel} onChange={handleTel} pattern="[0-9]{10}" required />
                            </Form.Group>

                            <Button variant="primary" type="submit" block className="mt-3">
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Register;
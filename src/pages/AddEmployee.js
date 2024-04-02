import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';

import Cart from "../classes/Cart.mjs";
import ProductController from "../classes/ProductController.mjs";
import Order from "../classes/Order.mjs";
import AccountManager from "../classes/AccountManager.mjs";

function AddEmployee() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Tel, setTel] = useState("");

    const {account} = useAuth();

    const navigate = useNavigate();

    const onRegister = (event) => {
        event.preventDefault();
        const createAcc = async () => {
            const am = new AccountManager();
            try {
                const response = await am.createSellerAccount(account, username, password, name, Email, Tel);
                alert("Create Employee Successful");
                navigate("/");
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


    const handleTel = (event) => {
        setTel(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Card style={{ width: '500px', height: '600px' }}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', fontSize: '30px' }}>New Employee</Card.Title>
                        <Form onSubmit={onRegister}>
                            <Form.Group controlId="formBasicUsername" className="mt-3">
                                <Form.Label style={{ fontSize: '18px' }}>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsername} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="mt-3">
                                <Form.Label style={{ fontSize: '18px' }}>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} pattern=".{8,}" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicName" className="mt-3">
                                <Form.Label style={{ fontSize: '18px' }}>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleName} pattern="^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className="mt-3">
                                <Form.Label style={{ fontSize: '18px' }}>Email</Form.Label>
                                <Form.Control type="tel" placeholder="Enter email" value={Email} onChange={handleEmail} pattern="[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})" required />
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

export default AddEmployee;
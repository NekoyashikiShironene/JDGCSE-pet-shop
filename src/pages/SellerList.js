import React, { useState, useEffect } from "react";
import HomeNavbar from "../components/HomeNavbar.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

import AccountManager from "../classes/AccountManager.mjs";

function SellerList() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sellers, setSellers] = useState([]);
    const navigate = useNavigate();

    const { account, minicart, setMiniCart } = useAuth();

    useEffect(() => {
        if (account.role !== "Admin")
            return;

        const fetchSellers = async () => {
            try {
                const am = new AccountManager();
                const sellers = await am.getAllSeller();
                setSellers(sellers);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchSellers();
        return () => { };

    }, []);

    return (
        <div>
            <HomeNavbar />
            <div className="main-container">
                <h1 style={{ textAlign: "center", margin: "50px" }}>Seller List</h1>
                <Container style={{ maxWidth: "500px" }}>
                    {sellers.map(seller => (
                        <Card className="m-auto" style={{ marginBottom: "20px" }}>
                            <Row>
                                <Col>
                                    <Card.Body>
                                        <Card.Title>{seller.emp_name}</Card.Title>
                                        <Card.Text>Username: {seller.username}</Card.Text>
                                        <Card.Text>Email: {seller.email}</Card.Text>
                                        <Card.Text>Tel: {seller.tel}</Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                </Container>
            </div>
        </div>
    );
}

export default SellerList;

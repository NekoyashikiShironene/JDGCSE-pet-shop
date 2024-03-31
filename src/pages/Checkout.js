import React, { useState } from "react";
import HomeNavbar from "../components/HomeNavbar.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, CloseButton } from 'react-bootstrap';


function Checkout() {
    const [quantity, setQuantity] = useState(0);
    return (
        <div>
            <HomeNavbar />
            <div className="main-container">
                <h1 style={{ textAlign: "center", margin: "50px" }}>Checkout!</h1>
                <Container>
                    <Form>
                        <Card className="m-auto" style={{ width: "750px" }}>
                            <Row style={{ display: "flex", alignItems: "center" }}>
                                <Col xs={4}>
                                    <Card.Img src="assets/product/1.png" style={{ width: "150px", marginLeft: "20px" }}></Card.Img>
                                </Col>
                                <Col xs={5}>
                                    <Link to="/product/1" target="_blank"><Card.Title>Product Name</Card.Title></Link>
                                    <Card.Text style={{ fontSize: "18px" }}>380B</Card.Text>
                                </Col>
                                <Col xs={3} style={{ display: "flex", alignItems: "center" }}>

                                    <div style={{ display: "flex", marginRight: "20px" }}>
                                        <Card.Text style={{ fontSize: "30px" }}>× 2</Card.Text>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Form>

                    <Card className="m-auto" style={{ width: "750px" }}>
                        <Row style={{ display: "flex", alignItems: "center" }}>

                            <Col style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ display: "flex", margin: "20px" }}>
                                    <Card.Text style={{ fontSize: "30px" }}>Total Price:</Card.Text>
                                </div>
                            </Col>
                            <Col style={{ display: "flex", alignItems: "center" }}>

                                <div style={{ display: "flex", marginRight: "20px" }}>
                                    <Card.Text style={{ fontSize: "30px" }}>380 B</Card.Text>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    <div style={{ textAlign: "center", margin: "20px" }}>
                        <Button variant="secondary">Back</Button>
                        <Button variant="primary" style={{ marginRight: "10px" }}>Update</Button>
                        
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Checkout;
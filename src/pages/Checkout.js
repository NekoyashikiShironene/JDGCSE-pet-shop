import React, { useState } from "react";
import HomeNavbar from "../components/HomeNavbar.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, CloseButton } from 'react-bootstrap';


function Checkout() {
    const [quantity, setdQuantity] = useState(0);
    const navigate = useNavigate();
    const order = (event) => {
        navigate("/orders");
    }
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
                                    <Card.Text style={{ fontSize: "20px" }}>Total Price:</Card.Text>
                                </div>
                            </Col>
                            <Col style={{ display: "flex", alignItems: "center" }}>

                                <div style={{ display: "flex", marginRight: "20px" }}>
                                    <Card.Text style={{ fontSize: "20px" }}>380 B</Card.Text>
                                </div>
                            </Col>
                        </Row>
                    </Card>

                    <Card className="m-auto" style={{ width: "750px" }}>
                        <div>
                            <Form className="m-3">
                                <Form.Group controlId="formBasicUsername" className="mt-3">
                                    <Form.Label style={{ fontSize: '22px' }}>Destination address (Optional)</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="" />
                                </Form.Group>
                            </Form>
                        </div>

                    </Card>
                    <div style={{ textAlign: "center", margin: "20px" }}>
                        <Button variant="outline-primary">Go back</Button>
                        <Button variant="success" style={{ margin: "10px" }} onClick={order}>Order products</Button>

                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Checkout;
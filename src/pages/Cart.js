import React, { useState } from "react";
import HomeNavbar from "../components/HomeNavbar.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, CloseButton } from 'react-bootstrap';


function Cart() {
    const [quantity, setQuantity] = useState(0);
    return (
        <div>
            <HomeNavbar />
            <div className="main-container">
                <h1 style={{ textAlign: "center", margin: "50px" }}>My cart</h1>
                <Container>
                    <Form>
                        <Card className="m-auto" style={{ width: "1000px" }}>
                            <Row style={{ display: "flex", alignItems: "center" }}>
                                <Col xs={1}>
                                    <Form.Check type="checkbox" style={{
                                        display: "inline-block",
                                        width: "50px",
                                        marginTop: "auto",
                                        marginBottom: "auto",
                                        marginLeft: "30px"
                                    }}>
                                    </Form.Check>
                                </Col>
                                <Col xs={2}>
                                    <Card.Img src="assets/product/1.png" style={{ width: "150px", }}></Card.Img>
                                </Col>
                                <Col xs={6}>
                                    <Link to="/product/1"><Card.Title>Product Name</Card.Title></Link>
                                    <Card.Text>380B</Card.Text>
                                </Col>
                                <Col xs={3} style={{ display: "flex", alignItems: "center" }}>

                                    <div style={{ display: "flex", marginRight: "20px" }}>
                                        <Button>-</Button>
                                        <Form.Control type="number" style={{ margin: "0 10px" }} value={quantity}></Form.Control>
                                        <Button>+</Button>
                                        <CloseButton style={{ margin: "10px" }} onClick={() => { }}></CloseButton>
                                    </div>
                                </Col>
                            </Row>
                        </Card>

                        <div style={{ textAlign: "center", margin: "20px" }}>
                            <Button variant="primary" style={{ marginRight: "10px" }}>Checkout</Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </div>
    );
}

export default Cart;


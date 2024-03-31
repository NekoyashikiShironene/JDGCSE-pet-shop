import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import HomeNavbar from "../components/HomeNavbar.js";

function ProductDetail() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const productName = "Example Product";
    const productDetails = [
        "Example detail 1",
        "Example detail 2",
        "Example detail 3"
    ];

    return (
        <div>
            <HomeNavbar />
            <Container fluid className="product-detail-container">
                <Row className="justify-content-md-center align-items-center" style={{ minHeight: '100vh' }}>
                    <Col md={6}>
                        <Card className="product-info-card">
                            <Card.Img src="/assets/product/1.png" />
                            <Card.Body>

                                <Card.Title>DOG FOOD</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Dog food daily food for adult dogs</Card.Subtitle>
                                <Card.Text>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro eum velit
                                    aspernatur, eligendi distinctio corporis, voluptas assumenda impedit deleniti
                                    molestiae aut alias quaerat dicta itaque? Tempore laboriosam quibusdam
                                    consectetur necessitatibus.
                                </Card.Text>
                                <div className="product-price">
                                    380 B
                                </div>
                                <div className="product-quantity">
                                    {/* Quantity selector */}
                                </div>
                                <Form>
                                    <Form.Control type="number" value={quantity} onChange={(event) => {setQuantity(event.target.value)}}></Form.Control>
                                    <Button variant="primary" onSubmit={() => {}}>Add to cart</Button>
                                </Form>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProductDetail;

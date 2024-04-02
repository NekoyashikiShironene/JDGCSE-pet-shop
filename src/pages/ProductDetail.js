import React, {Profiler, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useAuth } from "../contexts/auth.js";
import HomeNavbar from "../components/HomeNavbar.js";


import Cart from "../classes/Cart.mjs";
import ProductController from "../classes/ProductController.mjs";
//import Cart from "../classes/Cart.mjs";

function ProductDetail() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { account } = useAuth();

    const onAddToCart = (event) => {
        event.preventDefault();
        const addToCart = async () => {
            if (account.role == "Customer") {
                 const cart = new Cart(account.cartID);
                 await cart.addProduct(id, quantity);
                 alert("Added");
            }
        }

        addToCart();
    }

    useEffect(() => {
        const fetchProduct = async () => {
                try {
                    const pc = new ProductController();
                    const data = await pc.searchProduct(undefined, undefined, undefined, id);
                    if (!data.stt_code) {
                        throw new Error("Data fetch failed");
                    }
                    setProduct(data.return_value[0]);
                    setLoading(false);
                    setError(null);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            }
    
        fetchProduct(); 
        return () => {};
    }, []);

    if (loading) {
        return <div>Loading</div>
    }

    if (error)
        return <div>{error}</div>

    return (
        <div>
            <HomeNavbar />
            <Container fluid className="product-detail-container">
                <Row className="justify-content-md-center align-items-center" style={{ minHeight: '100vh' }}>
                    <Col md={6}>
                        <Card className="product-info-card">
                            <Card.Img src={product.image_path} />
                            <Card.Body>

                                <Card.Title>{product.prod_name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{"Type: "+product.PetType}</Card.Subtitle>
                                <Card.Text>
                                    {product.detail}
                                </Card.Text>
                                <div className="product-price">
                                    {product.price+"฿"}
                                </div>
                                <div className="product-quantity">
                                    {/* Quantity selector */}
                                </div>
                                <Form>
                                    <Form.Control type="number" value={quantity} onChange={(event) => {setQuantity(event.target.value)}}></Form.Control>
                                    <Button variant="primary" onClick={onAddToCart}>Add to cart</Button>
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

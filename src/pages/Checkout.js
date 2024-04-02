import React, { useState, useEffect } from "react";
import HomeNavbar from "../components/HomeNavbar.js";
import { useNavigate  } from "react-router-dom";
import { useAuth } from "../contexts/auth.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, CloseButton } from 'react-bootstrap';

import Cart from "../classes/Cart.mjs";
import ProductController from "../classes/ProductController.mjs";
import Product from "../classes/Product.mjs";


function Checkout() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const [dst, setDst] = useState(undefined);

    const { account, minicart } = useAuth();


    const checkout = (event) => {
        
        const checkoutProd = async () => {
            const cart = new Cart(account.cartID);
            await cart.checkout(minicart.join(","), dst || undefined);
        }

        checkoutProd();
        navigate("/orders");
    }


    useEffect(() => {
        if (account.role !== "Customer")
            return;
    
        const fetchCartItem = async () => {
            try {
                const pc = new ProductController();
                const cart = new Cart(account.cartID);
                const allCartItem = await cart.getCartItem(account.cartID, "0");
    
  
                const selectedCartItem = allCartItem.filter(item => minicart.includes(item.ProdID));
                console.log("Cart =>", selectedCartItem);
    
                const uniqueModifiedItems = new Set();
    
                await Promise.all(selectedCartItem.map(async item => {
                    const p = await pc.searchProduct(undefined, undefined, undefined, item.ProdID);
                    const modifiedItem = {
                        id: item.ProdID,
                        quantity: item.quantity,
                        name: p.return_value[0].prod_name,
                        price: p.return_value[0].price,
                        image_path: p.return_value[0].image_path,
                        product_selected: true
                    };
                    uniqueModifiedItems.add(JSON.stringify(modifiedItem));
                }));
    
                const modifiedItemsArray = Array.from(uniqueModifiedItems).map(item => JSON.parse(item));
    
                const selectedProdString = minicart.join(',');
                let totalprice = await cart.calTotalPrice(selectedProdString);
                setTotalPrice(totalprice);
                setProducts(modifiedItemsArray);
                
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchCartItem();
        return () => { };
    
    }, []);
    

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
                        {products.map(item => (
                            <Card className="m-auto" style={{ width: "750px" }}>
                                <Row style={{ display: "flex", alignItems: "center" }}>
                                    <Col xs={4}>
                                        <Card.Img src={item.image_path} style={{ width: "150px", marginLeft: "20px" }}></Card.Img>
                                    </Col>
                                    <Col xs={5}>
                                        <Link to="/product/1" target="_blank"><Card.Title>{item.name}</Card.Title></Link>
                                        <Card.Text style={{ fontSize: "18px" }}>{item.price+"฿"}</Card.Text>
                                    </Col>
                                    <Col xs={3} style={{ display: "flex", alignItems: "center" }}>

                                        <div style={{ display: "flex", marginRight: "20px" }}>
                                            <Card.Text style={{ fontSize: "30px" }}>{`× ${item.quantity}`}</Card.Text>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        ))
                        }

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
                                    <Card.Text style={{ fontSize: "20px" }}>{totalPrice+"฿"}</Card.Text>
                                </div>
                            </Col>
                        </Row>
                    </Card>

                    <Card className="m-auto" style={{ width: "750px" }}>
                        <div>
                            <Form className="m-3">
                                <Form.Group controlId="formBasicUsername" className="mt-3">
                                    <Form.Label style={{ fontSize: '22px' }} onChange={(e) => setDst(e.target.value)}>Destination address (Optional)</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="" />
                                </Form.Group>
                            </Form>
                        </div>

                    </Card>
                    <div style={{ textAlign: "center", margin: "20px" }}>
                        <Link to="/cart"><Button variant="outline-primary">Go back</Button></Link>
                        <Button variant="success" style={{ margin: "10px" }} onClick={checkout}>Order products</Button>

                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Checkout;
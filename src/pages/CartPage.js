import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, CloseButton } from 'react-bootstrap';

import Cart from "../classes/Cart.mjs";
import ProductController from "../classes/ProductController.mjs";


function CartPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const {account, minicart, setMiniCart } = useAuth();


    const handleToggleSelect = (itemId) => {
        setProducts(products.map(item => {
          if (item.id === itemId) {
            if (item.product_selected)
                setMiniCart(minicart.filter(item => item !== itemId));
            else
                setMiniCart([...minicart, itemId]);
            return { ...item, product_selected: !item.product_selected };
          } else {
            return item;
          }
        }));
      };
      
    const handleDeleteProduct = (itemId) => {
        const deleteProd = async () => {
            const cart = new Cart(account.cartID);
            await cart.deleteCartItem(itemId);
            setMiniCart(minicart.filter(item => item !== itemId));
        }
        deleteProd();
        setProducts(products.filter(item => item.id !== itemId));
    };
    

    const checkout = (event) => {
        const filterProduct = async () => {
            const cart = new Cart(account.cartID);
            const itemsToRemove = products.filter(item => item.product_selected === true);
            for (const item of itemsToRemove) {
                await cart.deleteCartItem(item.id);;
            }
        }
        
        navigate("/checkout");
    }


    useEffect(() => {
        if (account.role !== "Customer")
            return;

        const fetchCartItem = async () => {
            try {
                const pc = new ProductController();
                const cart = new Cart(account.cartID);
                const allCartItem = await cart.getCartItem(account.cartID, "0");
                setMiniCart(allCartItem.map(item => item.ProdID));
                const uniqueModifiedItems = new Set();

                await Promise.all(allCartItem.map(async item => {
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
                setProducts(modifiedItemsArray);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
    
        fetchCartItem();
        return () => {};
    
    }, []);
    

    if (loading) {
        return <div>Loading</div>
    }

    if (error)
        return <div><h1>{error.message}</h1></div>

    return (
        <div>
            <HomeNavbar />
            <div className="main-container">
                <h1 style={{ textAlign: "center", margin: "50px" }}>My cart</h1>
                <Container>
                    <Form>
                        {products.map(item => (
                            <Card className="m-auto" style={{ width: "1000px" }}>
                                <Row style={{ display: "flex", alignItems: "center" }}>
                                    <Col xs={1}>
                                        <Form.Check type="checkbox" checked={item.product_selected} onChange={() => handleToggleSelect(item.id)} style={{
                                            display: "inline-block",
                                            width: "50px",
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            marginLeft: "30px"
                                        }}>
                                        </Form.Check>
                                    </Col>
                                    <Col xs={2}>
                                        <Card.Img src={item.image_path} style={{ width: "150px", }}></Card.Img>
                                    </Col>
                                    <Col xs={6}>
                                        <Link to={`/product/${item.id}`}><Card.Title>{item.name}</Card.Title></Link>
                                        <Card.Text>{item.price}</Card.Text>
                                    </Col>
                                    <Col xs={2} style={{ display: "flex", alignItems: "center" }}>

                                        <div style={{ display: "flex", marginRight: "20px" }}>

                                            <Card.Text style={{ fontSize: "30px" }}>{`× ${item.quantity}`}</Card.Text>

                                        </div>
                                    </Col>

                                    <Col xs={1} style={{ display: "flex" }}>

                                        <div style={{ display: "flex", marginRight: "20px" }}>
                                            <CloseButton style={{ margin: "10px" }} onClick={() => handleDeleteProduct(item.id)}></CloseButton>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        ))};


                        <div style={{ textAlign: "center", margin: "20px" }}>
                            <Button variant="primary" style={{ marginRight: "10px" }} onClick={checkout}>Checkout</Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </div>
    );
}

export default CartPage;


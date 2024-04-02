import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';

import Cart from "../classes/Cart.mjs";
import ProductController from "../classes/ProductController.mjs";
import Order from "../classes/Order.mjs";

function OrderStatus() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const { account } = useAuth();

    const convertDate = (str) => {
        const date = new Date(str);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'UTC'
        };
        return date.toLocaleDateString('en-US', options);
    }

    const handleToggleSelect = (itemId) => {
        setOrders(orders.map(item => {
            if (item.id === itemId) {
                return { ...item, order_selected: !item.order_selected };
            } else {
                return item;
            }
        }));
    };

    
    const ship = (orderID) => {
        const updateStt = async () => {
            const o = new Order();
            await o.updateStatus(orderID, "Shipping. . .", account.id);
        }
        updateStt();
        alert("Status Updated");
        window.location.reload();

    }

    const finish = (orderID) => {
        const updateStt = async () => {
            const o = new Order();
            console.log(orderID);
            await o.updateStatus(orderID, "Shipping successful!", account.id);
        }
        updateStt();
        alert("Status Updated");
        window.location.reload();
        
    }

    useEffect(() => {
        if (["Seller", "Admin"].includes(account.role) == false)
            return;

        const fetchCartItem = async () => {
            try {
                const pc = new ProductController();
                const o = new Order();
                const c = new Cart();

                const allItem = await o.getAllOrder(account.id, "e");
                const uniqueModifiedItems = new Set();

                await Promise.all(allItem.map(async item => {

                    const products = await c.getCartItemByOrderID(item.OrderID);
                    const productIDs = products.map(product => product.ProdID);
                    const o = new Order();
                    const stt = await o.getOrderStatus(item.OrderID);

                    const productDetails = await Promise.all(productIDs.map(async id => {
                        const productData = await pc.searchProduct(undefined, undefined, undefined, id);
                        const quantity = products.find(product => product.ProdID === id).quantity;
                        return { name: productData.return_value[0].prod_name, quantity };
                    }));


                    const modifiedItem = {
                        id: item.OrderID,
                        cart_id: item.CartID,
                        cust_id: item.CustID,
                        date: item.Order_date,
                        products: productDetails,
                        stt: stt[0].status_msg,
                        order_selected: false
                    };
                    uniqueModifiedItems.add(JSON.stringify(modifiedItem));
                }));

                const modifiedItemsArray = Array.from(uniqueModifiedItems).map(item => JSON.parse(item));
                setOrders(modifiedItemsArray);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchCartItem();
        return () => { };

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
                <h1 style={{ textAlign: "center", margin: "50px" }}>Order Status</h1>
                <Container>
                    <Form>
                        {orders.map(item => (

                            <Card className="m-auto" style={{ width: "600px", marginTop: "10px" }}>
                                <Row style={{ display: "flex", alignItems: "center", padding:"10px" }}>
                                    <Col>
                                        <Card.Text>OrderID: {item.id}</Card.Text>
                                    </Col>

                                    <Col>
                                        <Card.Text>CustID: {item.cust_id}</Card.Text>
                                    </Col>


                                    <Col>
                                        <Card.Text>Order date: {convertDate(item.date)}</Card.Text>
                                    </Col>
                                </Row>
                                <Row style={{ display: "flex", alignItems: "center", padding:"10px" }}>
                                    <Col>
                                        <Card.Text>{"Current status: "+item.stt}</Card.Text>
                                    </Col>
                                </Row>
                                <Row>

                                    <Table striped bordered hover size="s" style={{ width: "90%", marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}>
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        {item.products.map(subitem => (
                                            <>
                                                <tbody>
                                                    <tr>
                                                        <td>{subitem.name}</td>
                                                        <td>{subitem.quantity}</td>
                                                    </tr>
                                                </tbody>
                                            </>
                                        ))
                                        }

                                    </Table>
                                </Row>
                                <Row style={{padding: "10px"}}>
                                    <Col className="d-flex justify-content-center">
                                    <Button variant="primary" style={{width: "200px"}} onClick={() => {ship(item.id)}}>Update Status: Shipping</Button>
                                    </Col>

                                    <Col className="d-flex justify-content-center">
                                    <Button variant="success" style={{width: "200px"}} onClick={() => {finish(item.id)}}>Update Status: Finished</Button>
                                    </Col>
                                </Row>
                            </Card>

                        ))};
                        <div style={{ textAlign: "center", margin: "20px" }}>
                            <Link to="/">
                                <Button variant="primary" style={{ marginRight: "10px" }}>Back</Button>
                            </Link>
                        </div>
                    </Form>
                </Container>
            </div>
        </div>
    );
}

export default OrderStatus;
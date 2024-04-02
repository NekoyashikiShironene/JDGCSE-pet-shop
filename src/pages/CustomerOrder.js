import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';

import Cart from "../classes/Cart.mjs";
import ProductController from "../classes/ProductController.mjs";
import Order from "../classes/Order.mjs";


function CustomerOrder() {
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

    const acceptOrder = (event) => {
        const filterOrder = async () => {
            const o = new Order();
            const selectdOrders = orders.filter(item => item.order_selected === true);
            for (const item of selectdOrders) {
                await o.updateStatus(item.id, "The employee has accepted the order.", account.id);
            }
        }
        filterOrder();
        navigate("/order-status");
    }


    useEffect(() => {
        if (["Seller", "Admin"].includes(account.role) == false)
            return;

        const fetchCartItem = async () => {
            try {
                const pc = new ProductController();
                const o = new Order();
                const c = new Cart();

                const allItem = await o.getAllOrder(undefined, "e");
                const uniqueModifiedItems = new Set();


                await Promise.all(allItem.map(async item => {

                    const products = await c.getCartItemByOrderID(item.OrderID);
                    const productIDs = products.map(product => product.ProdID);

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
                        order_selected: false
                    };
                    uniqueModifiedItems.add(JSON.stringify(modifiedItem));
                }));

                const modifiedItemsArray = Array.from(uniqueModifiedItems).map(item => JSON.parse(item));
                console.log(modifiedItemsArray);
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
                <h1 style={{ textAlign: "center", margin: "50px" }}>Customer Orders</h1>
                <Container>
                    <Form>
                        {orders.map(item => (

                            <Card className="m-auto" style={{ width: "600px", marginTop: "10px" }}>
                                <Row style={{ display: "flex", alignItems: "center" }}>
                                    <Col xs={3}>
                                        <Form.Check type="checkbox" checked={item.order_selected} onChange={() => handleToggleSelect(item.id)} style={{
                                            display: "inline-block",
                                            width: "50px",
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            marginLeft: "30px"
                                        }}>
                                        </Form.Check>
                                    </Col>


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
                            </Card>

                        ))};


                        <div style={{ textAlign: "center", margin: "20px" }}>
                            <Button variant="primary" style={{ marginRight: "10px" }} onClick={acceptOrder}>Accept Order</Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </div>
    );
}

export default CustomerOrder;

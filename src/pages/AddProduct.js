import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Table, Dropdown, DropdownButton, CloseButton } from 'react-bootstrap';


import Cart from "../classes/Cart.mjs";
import ProductController from "../classes/ProductController.mjs";
import Order from "../classes/Order.mjs";
import AccountManager from "../classes/AccountManager.mjs";

function AddProduct() {
    const [products, setProducts] = useState(null);
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");
    const [MFDate, setMFDate] = useState("");
    const [ExpDate, setExpDate] = useState("");
    const [price, setPrice] = useState(0);
    const [remainQty, setRemainQty] = useState(0);
    const [petType, setPetType] = useState("");
    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { account } = useAuth();

    const navigate = useNavigate();

    const onAddProd = (event) => {
        event.preventDefault();
        const createProd = async () => {
            const pc = new ProductController();
            await pc.addProduct(name, detail, MFDate, ExpDate, price, remainQty, petType, "https://picsum.photos/500", account.id);
            try {
                alert("Create Employee Successful");
            } catch (error) {
                console.error("Error creating account:", error);
                alert(error.message);
            }
        }
        createProd();
        return () => { };
    }

    const deleteProduct = () => {

    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const pc = new ProductController();
                const data = await pc.searchProduct();
                if (!data.stt_code) {
                    throw new Error("Data fetch failed");
                }
                setProducts(data.return_value);
                setLoading(false);
                setError(null);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        fetchProducts();
        return () => {
        };
    }, []);

    if (loading) {
        return <div>Loading</div>
    }

    if (error)
        return <div>{error}</div>


    return (
        <div>
            <HomeNavbar />
            <div className="d-flex align-items-center" style={{ height: '100vh', marginLeft: "300px" }}>
                <Row>
                    <Col md={4}>
                        <Card style={{ width: '500px', height: '800px' }}>
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center', fontSize: '30px' }}>Add New Product</Card.Title>
                                <Form onSubmit={onAddProd}>
                                    <Form.Group controlId="formBasicname" className="mt-3">
                                        <Form.Label style={{ fontSize: '18px' }}>Product name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter product name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicdetial" className="mt-3">
                                        <Form.Label style={{ fontSize: '18px' }}>Description</Form.Label>
                                        <Form.Control as="textarea" placeholder="Enter Description" value={detail} onChange={(e) => { setDetail(e.target.value) }} pattern=".{8,}" required />
                                    </Form.Group>

                                    <DropdownButton id="dropdown-basic-button" title={petType || "Pet type"}>
                                        <Dropdown.Item onClick={() => { setPetType(null) }}>All</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { setPetType("Dog") }}>Dog</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { setPetType("Cat") }}>Cat</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { setPetType("Bird") }}>Bird</Dropdown.Item>
                                    </DropdownButton>

                                    <Form.Group controlId="formBasicmfdate" className="mt-3">
                                        <Form.Label style={{ fontSize: '18px' }}>Manufacturing Date</Form.Label>
                                        <Form.Control type="date" value={MFDate} onChange={(e) => { setMFDate(e.target.value) }} pattern=".{8,}" required />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicexp" className="mt-3">
                                        <Form.Label style={{ fontSize: '18px' }}>Expiry Date</Form.Label>
                                        <Form.Control type="date" value={ExpDate} onChange={(e) => { setExpDate(e.target.value) }} pattern=".{8,}" />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicName" className="mt-3">
                                        <Form.Label style={{ fontSize: '18px' }}>Price</Form.Label>
                                        <Form.Control type="number" value={price} onChange={(e) => { setPrice(e.target.value) }} pattern="^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$" required />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicremain" className="mt-3">
                                        <Form.Label style={{ fontSize: '18px' }}>Remain Quantity</Form.Label>
                                        <Form.Control type="number" value={remainQty} onChange={(e) => { setRemainQty(e.target.value) }} pattern="[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})" required />
                                    </Form.Group>

                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label style={{ fontSize: '18px' }}>Product Image</Form.Label>
                                        <Form.Control type="file" />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" block className="mt-3">
                                        Add
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={{ span: 4, offset: 3 }}>
                        <Table striped bordered hover style={{ "width": "500px" }}>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Detail</th>
                                    <th>MFDate</th>
                                    <th>ExpDate</th>
                                    <th>PetType</th>
                                    <th>price</th>
                                    <th>remainQty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(item => (
                                    <tr>
                                        <td>{item.ProdID}</td>
                                        <td>{item.prod_name}</td>
                                        <Link to={`/product/${item.ProdID}`} target="_blank"><td>Click</td></Link>
                                        <td>{item.MFDate}</td>
                                        <td>{item.EXPDate || ""}</td>
                                        <td>{item.PetType}</td>
                                        <td>{item.price}</td>
                                        <td>{item.RemainQty}</td>
                                        <CloseButton onClick={() => deleteProduct(item.ProdID)}></CloseButton>;
                                    </tr>
                                ))
                                }

                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </div>
        </div>
    )
}
export default AddProduct;
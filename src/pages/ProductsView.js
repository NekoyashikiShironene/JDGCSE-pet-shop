import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar.js";
import { useAuth } from "../contexts/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, FormControl, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

import ProductController from "../classes/ProductController.mjs";

function Products() {
    const [products, setProducts] = useState(null);
    const [keyword, setKeyword] = useState(undefined);
    const [petType, setPetType] = useState(null);
    const [maxPrice, setMaxprice] = useState(undefined);
    const [minPrice, setMinprice] = useState(undefined);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const onClickProduct = (event, id) => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            navigate(`/product/${id}`);
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const pc = new ProductController();
                const data = await pc.searchProduct(petType, minPrice, maxPrice, keyword);
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
    }, [petType, minPrice, maxPrice, keyword]);



    const onSearch = (event) => {
    };

    const onFilter = (event) => {
    };

    if (loading) {
        return <div>Loading</div>
    }

    if (error)
        return <div>{error}</div>

    return (
        <div>
            <HomeNavbar />
            <div className="main-container">
                <h1 style={{ textAlign: "center" }}>Products</h1>
                <Container className="mt-3">
                    <Form inline onSubmit={onSearch}>
                        <FormControl type="text" placeholder="Search" value={keyword} onChange={(event) => { setKeyword(event.target.value) }} className="mr-sm-2" />
                        <FormControl type="number" placeholder="Min price" className="mr-sm-2" onChange={(event) => { setMinprice(event.target.value) }} />
                        <FormControl type="number" placeholder="Max price" className="mr-sm-2" onChange={(event) => { setMaxprice(event.target.value) }} />
                        <DropdownButton id="dropdown-basic-button" title={petType || "Pet type"}>
                            <Dropdown.Item onClick={() => { setPetType(null) }}>All</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setPetType("Dog") }}>Dog</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setPetType("Cat") }}>Cat</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setPetType("Bird") }}>Bird</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="success" type="submit">Search</Button>

                    </Form>

                    {products && (
                        <Row>
                            {products.map(item => (
                                <Col lg={4} md={6} sm={12} className="mb-4" key={item.ProdID}>
                                    <Card onClick={(event) => onClickProduct(event, item.ProdID)} style={{ cursor: "pointer" }}>
                                        <Card.Img variant="top" src={item.image_path} style={{ width: '400px', height: '400px' }} />
                                        <Card.Body>
                                            <Card.Title>{item.prod_name}</Card.Title>
                                            <Card.Text>{item.price + "฿"}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}


                </Container>
            </div>
        </div>
    );
}

export default Products;

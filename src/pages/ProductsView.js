import React, { useState } from "react";
import HomeNavbar from "../components/HomeNavbar.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, FormControl, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

function Products() {
    const [keyword, setKeyword] = useState("");
    const [petType, setPetType] = useState(null);
    const [maxPrice, setMaxprice] = useState(99999);
    const [minPrice, setMinprice] = useState(0);

    const onSearch = (event) => {

    };

    const onFilter = (event) => {
    };

    const productItem = (
        <Col lg={4} md={6} sm={12} className="mb-4">
            <Link key={1} to={`/product/${1}`} style={{ textDecoration: 'none' }}>
                <Card>
                    <Card.Img variant="top" src="/assets/product/1.png" />
                    <Card.Body>
                        <Card.Title>Dog food daily food for adult dogs</Card.Title>
                        <Card.Text>
                            380 B
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
    return (
        <div>
            <HomeNavbar />
            <div className="main-container">
                <h1 style={{textAlign: "center"}}>Products</h1>
                <Container className="mt-3">
                <Form inline onSubmit={onSearch}>
                    <FormControl type="text" placeholder="Search" value={keyword} onChange={(event) => {setKeyword(event.target.value)}} className="mr-sm-2" />
                    <FormControl type="number" placeholder="Min price" className="mr-sm-2" onChange={(event) => {setMinprice(event.target.value)}}/>
                    <FormControl type="number" placeholder="Max price" className="mr-sm-2" onChange={(event) => {setMaxprice(event.target.value)}} />
                    <DropdownButton id="dropdown-basic-button" title={petType || "Pet type"}>
                        <Dropdown.Item onClick={() => {setPetType(null)}}>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => {setPetType("Dog")}}>Dog</Dropdown.Item>
                        <Dropdown.Item onClick={() => {setPetType("Cat")}}>Cat</Dropdown.Item>
                        <Dropdown.Item onClick={() => {setPetType("Bird")}}>Bird</Dropdown.Item>
                    </DropdownButton>
                    <Button variant="success" type="submit">Search</Button>

                </Form>

                <Row>
                    {productItem}
                    {productItem}
                    {productItem}
                    {productItem}
                    {productItem}
                    {productItem}
                    {/* More product items... */}
                </Row>
            </Container>
            </div>
        </div>
    );
}

export default Products;

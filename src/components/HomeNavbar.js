import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/auth.js';
import { useNavigate, Link } from "react-router-dom";

function HomeNavbar() {
    const { isLoggedIn, setIsLoggedIn, account, setAccount } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (event) => {
        setIsLoggedIn(false);
        setAccount(null);
        navigate("/");
    }

    return (
        <div className='fixed-top'>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/"><img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLC7usNgllGe7AuyP3ZBtzu76y-birIOVM1LpCAL5hlw&s"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="SE petshop logo"
                    /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/products">Products</Nav.Link>
                            <Nav.Link href="/">About Us</Nav.Link>
                            <Nav.Link href="/">Services</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            {
                                isLoggedIn ? (

                                    <>
                                        {
                                            account.role === "Customer" && (
                                                <>
                                                    <Link to="/cart">
                                                        <Button variant="primary" className='mx-2'>My Cart</Button>
                                                    </Link>
                                                    <Link to="/orders">
                                                        <Button variant="primary" className='mx-2'>My Orders</Button>
                                                    </Link>
                                                </>

                                            )}


                                        {["Seller", "Admin"].includes(account.role) && (
                                            <>

                                                <Link to="/customer-orders">
                                                    <Button variant="success" className='mx-2'>New Orders</Button>
                                                </Link>

                                                <Link to="/order-status">
                                                    <Button variant="primary" className='mx-2'>Order status</Button>
                                                </Link>


                                            </>

                                        )}


                                        {account.role === "Admin" && (
                                            <>
                                                <Link to="/seller-list">
                                                    <Button variant="outline-info" className='mx-2'>Seller List</Button>
                                                </Link>

                                                <Link to="/add-emp">
                                                    <Button variant="success" className='mx-2'>Add Seller</Button>
                                                </Link>

                                                <Link to="/add-product">
                                                    <Button variant="success" className='mx-2'>Manage Product</Button>
                                                </Link>


                                            </>

                                        )}


                                        <Link to="/user-profile">
                                            <Button variant="primary" className='mx-2'>My Account</Button>
                                        </Link>

                                        <Button variant="outline-primary" className="mx-2" onClick={handleLogout}>Logout</Button>


                                    </>

                                ) : (
                                    <>
                                        <Button variant="primary" href="/login" className="mx-2">Login</Button>
                                        <Button variant="light" href="/register">Sign up</Button>
                                    </>
                                )

                            }


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </div>


    );
}

export default HomeNavbar;
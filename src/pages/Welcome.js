import React from "react";
import HomeNavbar from "../components/HomeNavbar.js";
import { Link} from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();

    return (
        <div>      
        <header className="App-header">
            <HomeNavbar/>
            <div className="main-container">
                <h1>Welcome to JDGCSE Pet Shop!</h1>
                <Button variant="primary" className='mx-2' onClick={() => {navigate("/products")}}>Buy now</Button>
            </div>
        </header>
        </div>
        
    )
}

export default Welcome;
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
            <div style={{
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'space-around', 
                 padding: '50px', 
                 marginTop: '50px',
                 backgroundColor: '#FFEBCD' }
            }>
                <div>
                    <h1 style={{ color: '#FF8C00', fontWeight: 'bold', fontSize: '48px', marginBottom: '20px' }}>Preparing Your Home For Your Buddy</h1>
                    <p style={{ color: '#555', marginBottom: '30px' }}>Welcome to our pet-friendly community! 
                        Whether you're welcoming a new furry friend into your home or simply looking 
                        to enhance your pet's living environment.</p>
                    <Link to="/products"><Button variant="success" style={{width:"400px", height: "100px", fontSize: "50px"}}>Buy Now</Button></Link>
                </div>
                <div>
                    <img src="https://i.ytimg.com/vi/rdN4i1xZPw0/maxresdefault.jpg"></img>
                </div>
            </div>
        </header>
        </div>
        
    )
}

export default Welcome;
import React from "react";
import { Link} from 'react-router-dom';

function Welcome() {
    return (
            <header className="App-header">
                <nav>
                    <ul className="nav-menu">
                        <li><a href="">HOME</a></li>
                        <li><a href="">PRODUCTS</a></li>
                        <li><a href="">ABOUT US</a></li>
                        <li><a href="">SERVICE</a></li>
                    </ul>

                    <ul className="nav-acc-menu">
                        <li><a href="/Login">Login</a></li>
                        <li><a href="/Register">Register</a></li>
                    </ul>

                </nav>
                <img className="MyLogo" src="https://cdn.discordapp.com/attachments/1192083758711570503/1215311302520733716/f523d0e0-6616-4f28-8f7d-1877cd12318c.png?ex=65fc49d9&is=65e9d4d9&hm=fa39afabc2c957b9409a054e039db0a3705a1858a9bf589b7deabf8f14f59699&" alt="Logo" width={250} height={250}></img>
                <h1>Welcome to JDGCSE Pet Shop!</h1>
            </header>
    )
}

export default Welcome;
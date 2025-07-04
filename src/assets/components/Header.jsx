import React from "react";
import { NavLink } from "react-router-dom";
import CountdownButton from "./CountdownButton";
import "./header.css"

export default function Header() {

    const activeStyle = {
        background: "#e0d7ff",
        color: "#6c2eb7",
        transform: "scale(1.08)",
        boxShadow: "0 2px 8px rgba(108,46,183,0.12)"
    }

    return (
        <header className="header">
            <nav className="navbar">
                <NavLink 
                    to="/Wishes"
                    style={({isActive}) => isActive ? activeStyle : null}
                    className="nav-link"
                >All Wishes</NavLink>

                <NavLink 
                    to="/Gallery"
                    style={({isActive}) => isActive ? activeStyle : null}
                    className="nav-link"
                >Gallery Wall</NavLink>
            </nav>
        </header>
    )
}
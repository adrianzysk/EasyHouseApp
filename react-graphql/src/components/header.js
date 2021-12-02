import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "./header.css"
const socket = socketIOClient('http://localhost:2000')
const navStyle = {
  color: 'white' 
}
class Header extends Component  {
    socket = socketIOClient('http://localhost:2000')   
    render()
    {
        return (
        <header className="Header">
        <nav className="Nav">
          <h3>EazyHouse</h3>
          <ul className="Nav-Links">
            <li>
              <NavLink style={navStyle} to="/">Strona Główna </NavLink>
            </li>
            <li>
              <NavLink style={navStyle} to="/devices">Urządzenia </NavLink>
            </li  >
            <li>
              <NavLink style={navStyle} to="/rooms">Pokoje </NavLink>
            </li  >
          </ul>
        </nav>
      </header>     
    );}
  };
  
  export   { Header  ,socket};
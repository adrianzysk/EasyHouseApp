import React from 'react';
import { NavLink } from "react-router-dom";

const device = () => {
    const navStyle = {
       color: 'white' 
    }
    return ( 
        <nav className="Nav">
          <ul className="NavClass">
            <li>
              <NavLink style={navStyle} to="/devices/switch">switch </NavLink>
            </li>
            <li>
              <NavLink style={navStyle} to="/devices/thermometer">termometr </NavLink>
            </li  >
            <li>
              <NavLink style={navStyle} to="/devices/fridge">fridge </NavLink>
            </li  >
          </ul>
        </nav>
    );
};
export default device;
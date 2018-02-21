import React from 'react';

import classes from "./NavItems.module.css";
import NavItem from "./NavItem/NavItem";

const navItems = (props) => {
    return (
        <ul className={classes.NavItems} >
            <NavItem exact link="/" >
                Burger Builder
            </NavItem>
            <NavItem link="/orders" >
                Orders
            </NavItem>
        </ul>
    )
}
 
export default navItems;
 

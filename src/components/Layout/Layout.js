import React, {Component} from "react";

import Toolbar from "../Nav/Toolbar/Toolbar";
import SideDrawer from "../Nav/SideDrawer/SideDrawer";

import classes from "./Layout.module.css";

class Layout extends Component {

    state= {
        showSideDrawer: false
    }

    toggleSideDrawerHandler = () => {
        const showSideDrawerState = this.state.showSideDrawer;
        this.setState({
            showSideDrawer: !showSideDrawerState
        })
    }

    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar click={this.toggleSideDrawerHandler}/>
                <SideDrawer 
                close={this.sideDrawerCloseHandler}
                show={this.state.showSideDrawer} />
                <main className={classes.Content} >
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}    

export default Layout;
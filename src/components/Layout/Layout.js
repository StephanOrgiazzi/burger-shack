import React from "react";

import Toolbar from "../Nav/Toolbar/Toolbar";

import classes from "./Layout.module.css";

const layout = (props) => (
    <React.Fragment>
        <div>
            <Toolbar />
        </div>
        <main className={classes.Content} >
            {props.children}
        </main>
    </React.Fragment>
)

export default layout;
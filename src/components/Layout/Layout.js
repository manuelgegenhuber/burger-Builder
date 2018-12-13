import React from 'react';
import Aux from '../../hoc/Aux';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => {
    return (
        <Aux>
            <Toolbar></Toolbar>
            <div>SideDrawer</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};


export default layout;
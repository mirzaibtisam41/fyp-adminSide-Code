import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { GlobalContext } from "../MainContext/Context";
import { useHistory } from 'react-router-dom';
import { adminLogout } from "../../Store/Actions/Actions";
import { connect } from "react-redux";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function TemporaryDrawer({ logoutAdminFunc }) {
    const classes = useStyles();
    const { toggleDrawer, state } = useContext(GlobalContext);
    const history = useHistory();

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button onClick={(e) => history.push("/profile")}>
                    <i style={{ position: "relative", top: "6px" }} className="fa text-danger fa-user mr-3 mb-3" aria-hidden="true"></i>
                    <ListItemText primary={'Profile'} />
                </ListItem>
                <ListItem button onClick={(e) => history.push("/dashboard")}>
                    <i style={{ position: "relative", top: "6px" }} className="fa text-danger fa-tachometer mr-3 mb-3" aria-hidden="true"></i>
                    <ListItemText primary={'Dashboard'} />
                </ListItem>
                <ListItem button onClick={(e) => history.push("/customers")}>
                    <i style={{ position: "relative", top: "6px" }} className="fa text-danger fa-users mr-3 mb-3" aria-hidden="true"></i>
                    <ListItemText primary={'Customers'} />
                </ListItem>
                <ListItem button onClick={(e) => history.push("/catrgory")}>
                    <i style={{ position: "relative", top: "6px" }} className="fa text-danger fa-list-alt mr-3 mb-3" aria-hidden="true"></i>
                    <ListItemText primary={'Categories'} />
                </ListItem>
                <ListItem button onClick={(e) => history.push("/products")}>
                    <i style={{ position: "relative", top: "6px" }} className="fa text-danger fa-product-hunt mr-3 mb-3" aria-hidden="true"></i>
                    <ListItemText primary={'Products'} />
                </ListItem>
                <ListItem button onClick={(e) => history.push("/orders")}>
                    <i style={{ position: "relative", top: "6px" }} className="fa text-danger fa-truck mr-3 mb-3" aria-hidden="true"></i>
                    <ListItemText primary={'Orders'} />
                </ListItem>
                <ListItem button onClick={(e) => history.push("/adds")}>
                    <i style={{ position: "relative", top: "6px" }} className="fa text-danger fa-credit-card mr-3 mb-3" aria-hidden="true"></i>
                    <ListItemText primary={'Post Adds'} />
                </ListItem>
                <ListItem button onClick={(e) => history.push("/deals")}>
                    <i style={{ position: "relative", top: "6px" }} className="fa text-danger fa-line-chart mr-3 mb-3" aria-hidden="true"></i>
                    <ListItemText primary={'Manage Deals'} />
                </ListItem>
                <ListItem button onClick={logoutAdminFunc}>
                    <i style={{ position: "relative", top: "6px" }} class="fa text-danger fa-sign-out  mr-3 mb-3" aria-hidden="true"></i>
                    <ListItemText primary={'Logout'} />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        logoutAdminFunc: () => { dispatch(adminLogout()) }
    }
}

export default connect(null, mapDispatchToProps)(TemporaryDrawer);
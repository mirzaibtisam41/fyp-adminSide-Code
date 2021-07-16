import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Deals from './Pages/DealsTab';
import { getAllProductsFunc } from "../../../Store/Actions/Actions";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    padding: {
        padding: "3rem 1rem 1rem 1rem",
        minHeight: "100vh",
        marginTop: "4rem"
    }
}));

export default function ScrollableTabsButtonForce() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const admin = useSelector(state => state.adminLoginReducer.admin);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getAllProductsFunc();
    }, [])

    return <>
        {admin === null && <Redirect to="admin/login" />}
        <div className={classes.padding}>
            <h3 className="text-center text-danger">
                <i className="fa fa-line-chart mr-3 mb-3" aria-hidden="true"></i>
                Manage Product Deals</h3>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example"
                    >
                        <Tab label="Daily Offer" icon={<i className="fa fa-gift fa-lg" aria-hidden="true"></i>} {...a11yProps(0)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Deals />
                </TabPanel>
            </div>
        </div >
    </>
}

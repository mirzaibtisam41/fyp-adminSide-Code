import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Card, Container } from "react-bootstrap";
import Chart from "../Chart/Chart";
import CountUp from "react-countup";
import "./view.css";
import { GlobalContext } from "../../MainContext/Context";
import { useSelector } from "react-redux";
import { getAllProductsFunc } from "../../../Store/Actions/Actions";
import { Row, Col } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: "2rem"
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default function SpacingGrid() {
    const classes = useStyles();
    const { users, orders } = useContext(GlobalContext);
    const products = useSelector(state => state.productReducer.products);
    const Active = products && products.filter(item => item.active === "Active");
    const NotActive = products && products.filter(item => item.active === "Not Active");
    const Deal = products && products.filter(item => item.active === "In Deal");
    const pendingOrders = orders?.filter(item => (item.status !== "complete" && item.status !== "Received"));
    const completeOrders = orders?.filter(item => (item.status === "complete" || item.status === "Received"));

    useEffect(() => {
        getAllProductsFunc();
    }, [])

    return (
        <div className="bg-white py-3 mx-4" style={{ marginTop: "6rem" }}>
            <h3 className="text-center font-weight-bold text-danger">
                <i className="fa text-danger fa-tachometer mr-3 mb-3" aria-hidden="true"></i>
                Dashboard</h3>
            <Grid item className={classes.root} container spacing={2}>
                <Grid item xs={12}>
                    <Grid item container justify="center" spacing={1}>
                        {[{ title: 'Customers', count: users && users.length },
                        { title: 'Orders', count: orders?.length },
                        { title: 'Pending Orders', count: pendingOrders?.length },
                        { title: 'Complete Orders', count: completeOrders?.length },
                        { title: 'Available Products', count: products && products.length },
                        { title: 'Active Products', count: Active?.length },
                        { title: 'Non-Active Products', count: NotActive?.length },
                        { title: 'Deal Products', count: Deal?.length }].map((value, index) => (
                            <Grid item key={index} item>
                                <Card className={`card-items${index}`} style={{ width: '17rem' }}>
                                    <Card.Body>
                                        <Card.Title>{value.title}</Card.Title>
                                        <Card.Text>
                                            <CountUp end={value.count} />
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Container className="mt-5">
                <Row>
                    <Col lg={6}>
                        <Chart users={users}
                            chartType={"Bar"}
                            orders={orders}
                            pendingOrders={pendingOrders}
                            completeOrders={completeOrders}
                        />
                    </Col>
                    <Col lg={6}>
                        <Chart products={products}
                            Active={Active}
                            NotActive={NotActive}
                            Deal={Deal}
                            chartType={"Polar"} />
                    </Col>
                </Row>

            </Container>
        </div>
    );
}

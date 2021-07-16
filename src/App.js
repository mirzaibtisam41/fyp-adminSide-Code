import React from 'react';
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login/login";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard/dashboard";
import Navbar from "./components/Navbar/Navbar";
import ErrorMessage from "./components/ErrorDisplay/ErrorDisplay";
import Backdrop from "./components/Backdrop/Backdrop";
import Footer from "./components/Dashboard/Footer/Footer";
import Customers from "./components/Customer/Customer";
import Category from "./components/Category/Category";
import Products from "./components/Product/AddProductModal";
import Orders from "./components/Orders/Orders";
import Profile from "./components/Profile/Profile";
import Adds from "./components/AddsPosting/AddsPosting";
import Deals from "./components/Dashboard/Stepper/Stepper";
import Drawer from "./components/Drawer/Drawe";
import MainContext from './components/MainContext/Context';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <MainContext>
                    <ErrorMessage />
                    <Navbar />
                    <Drawer />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/admin/login" component={Login} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/customers" component={Customers} />
                        <Route path="/catrgory" component={Category} />
                        <Route path="/products" component={Products} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/adds" component={Adds} />
                        <Route path="/deals" component={Deals} />
                    </Switch>
                    <Backdrop />
                    <Footer />
                </MainContext>
            </BrowserRouter>
        </div>
    )
}

export default App;

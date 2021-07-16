import React, { createContext, useEffect, useState } from "react";
import { getAllUserApi, getAllOrdersApi, changeOrderStatusApi } from "../../Api/apiActions";
import axios from "axios";
import { startLoadingFunc, EndLoadingFunc } from "../../Store/Actions/CommonFunc";

export const GlobalContext = createContext();

const MainContext = ({ children }) => {
    const [users, setUsers] = useState();
    const [state, setState] = useState({ left: false });
    const [orders, setOrders] = useState([]);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    useEffect(() => {
        getAllUsersFunc();
        getAllOrdersFunc();
    }, [])

    const getAllUsersFunc = async () => {
        startLoadingFunc();
        const { data } = await axios.get(getAllUserApi);
        if (data) {
            EndLoadingFunc();
            setUsers(data);
        }
    }

    const getAllOrdersFunc = async () => {
        const { data } = await axios.get(getAllOrdersApi);
        setOrders(data);
    }

    const changeOrderStatus = async (id, status) => {
        if (status !== "Received") {
            const { data } = await axios.post(changeOrderStatusApi, { id, status });
            if (data) return setOrders(data);
        }
    }

    return <GlobalContext.Provider value={{ toggleDrawer, state, users, orders, changeOrderStatus }}>
        {children}
    </GlobalContext.Provider>
}

export default MainContext;
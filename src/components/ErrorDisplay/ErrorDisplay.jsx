import React from 'react';
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';


const ErrorDisplay = ({ message }) => {
    return <React.Fragment>
        {
            message &&
            <div className="w-100" style={{ position: "fixed", top: "0", zIndex: "1000000" }}>
                <Alert severity={message.type}>{message.message}</Alert>
            </div>
        }
    </React.Fragment>
}

function mapStateToProps(state) {
    return {
        message: state.errorMessageReducer.message
    }
}

export default connect(mapStateToProps, null)(ErrorDisplay);
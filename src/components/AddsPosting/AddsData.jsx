import React, { useState, useEffect } from 'react';
import { Input, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { postAddFunc } from "../../Store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const AddsData = ({ type }) => {
    const classes = useStyles();
    const [adds, setAdds] = useState();
    const dispatch = useDispatch();
    const addsData = useSelector(state => state.PostAddsReducer.Adds);

    return <React.Fragment>
        <div>
            <Input onChange={(e) => setAdds(e.target.files[0])} type="file" />
            <Button
                onClick={() => dispatch(postAddFunc({ adds, type }))}
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
            >
                Upload
            </Button>
        </div>

        <div className="mt-2 d-flex flex-wrap">
            {
                addsData && addsData.map((item, index) => {
                    if (item.imageFor === type) return <Card key={index} AddItem={item} />
                })
            }
        </div>
    </React.Fragment>
}

export default AddsData;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { ServerPort } from "../../Api/apiActions";
import { red } from '@material-ui/core/colors';
import BackspaceIcon from '@material-ui/icons/Backspace';
import moment from "moment";
import { deleteAddsDataFunc } from "../../Store/Actions/Actions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        marginRight: "1rem",
        marginTop: "1rem"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardMediaCss: {
        objectFit: "fill",
        width: "100%",
        height: "100%"
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard({ AddItem }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {
                            AddItem && AddItem.type.includes('image') ? 'I' : 'V'
                        }
                    </Avatar>
                }
                action={
                    <IconButton onClick={() => dispatch(deleteAddsDataFunc(AddItem._id))} aria-label="settings">
                        <BackspaceIcon />
                    </IconButton>
                }
                title={AddItem.type}
                subheader={moment(AddItem.createdAt).format('MMMM Do YYYY, h:mm a')}
            />
            <div style={{ width: "100%", height: "13rem" }}>
                {
                    AddItem && AddItem.type.includes('image') ?
                        <img className={classes.cardMediaCss} src={`${ServerPort}${AddItem.Add}`} />
                        :
                        <video controls className={classes.cardMediaCss} src={`${ServerPort}${AddItem.Add}`} />
                }
            </div>
        </Card>
    );
}

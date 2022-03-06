import React, { useEffect } from "react";
import { ReactTypes } from "../../types/reactPages";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Typography, Button, Grid } from '@mui/material';
import fourOhFourGif from "../../images/avatar.gif"
import { useTranslation } from "react-i18next";


const useStyles: ReactTypes = makeStyles((theme: ReactTypes) => ({
    Container: {
        position: "absolute",
        left: "50%",
        top: "50%",
        textAlign: "center",
        transform: "translate(-50%, -50%)"
    },
    Image: {
        maxWidth: "100vw",
        width: "500px",
        boxShadow: theme.shadows[6],
        marginBottom: theme.spacing(2)
    },
    Button: {
        padding: theme.spacing(2),
    }
}))

export default function App(props: ReactTypes): ReactTypes {

    const { statusCode, message, button, redirect }: ReactTypes = props;
    const classes: ReactTypes = useStyles();
    const navigate: ReactTypes = useNavigate();
    const { t }: ReactTypes = useTranslation();



    useEffect(() => {
        if (redirect) {
            setTimeout(() => {
                navigate("/");
            }, 10000);
        };
    }, []);



    return (<React.Fragment>
        <div className={classes.Container}>
            <img src={fourOhFourGif} className={classes.Image} alt="404gif" />
            <Typography variant="h4">
                {statusCode}
            </Typography>
            {message ? <Typography variant="body1">
                {message}
            </Typography> : ""}
            <div className={classes.Button} />
            {button ? <Grid alignItems="center" justifyContent="center" container>
                <Grid item>
                    <Button variant="outlined" fullWidth onClick={(e: any) => navigate("/")}>{t("error.goBack")}</Button>
                </Grid>
            </Grid> : ""}
        </div>
    </React.Fragment>);

};
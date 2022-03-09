import React, { useState } from "react";
import { ReactTypes } from "../../types/reactPages";
import { Box, Button, Grid, IconButton, Typography, CircularProgress, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Loading from "../../components/loading/loading";
import MyLogo from "../../images/favicon.png";
import Image from "mui-image";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { styled } from '@mui/material/styles';
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import Dotdotdot from 'react-dotdotdot';
import axios from "../../helpers/axios";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";



const useStyles = makeStyles((theme: ReactTypes) => ({
    CardImage: {
        width: "100%",
        height: 250,
        backgroundSize: "cover",
        backgroundPosition: "center center"
    }
}))

const Input = styled('input')({
    display: 'none',
});

function CircularProgressWithLabel(props: any) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}


export default function App(): ReactTypes {
    const classes: ReactTypes = useStyles();
    const [file, setFile]: ReactTypes = useState(null);
    const [progress, setProgress]: ReactTypes = useState(0);
    const [startLoading, setStartLoading]: ReactTypes = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleUpload = (event: any): any => {
        if (event) event.preventDefault();
        if (!file) {
            return enqueueSnackbar(t("index.fileMissing"), {
                variant: "error",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                },
                autoHideDuration: 3500,
            });
        };
        const formData: any = new FormData();

        formData.append(
            "video",
            file,
            file.name
        );

        console.log(formData);

        const config: any = {
            onUploadProgress: (progressEvent: any) => {
                setProgress((progressEvent.loaded / progressEvent.total) * 100);
            },
            headers: { 'content-type': 'multipart/form-data' },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            maxRedirects: Infinity,
        };

        setStartLoading(true);
        axios.post("upload", formData, config).then((res: AxiosResponse) => {

            let data: any = res.data;

            if (data && data.content === "Missing video" && data.code === 501) {
                return enqueueSnackbar(t("index.fileMissing"), {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    },
                    autoHideDuration: 3500,
                });
            };

            if (data && data.content === "Only .mp4 format allowed!" && data.code === 501) {
                return enqueueSnackbar(t("index.invalidFileFormat"), {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    },
                    autoHideDuration: 3500,
                });
            };

            if (data && data.content === "The video file can't be larger than 1GB." && data.code === 501) {
                return enqueueSnackbar(t("index.largerVideo"), {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    },
                    autoHideDuration: 3500,
                });
            };


            if (data && !data.content && !data.code) {
                setFile(null);
                setProgress(0);
                Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
                setStartLoading(false);
                enqueueSnackbar(t("index.completedVideo"), {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    },
                    autoHideDuration: 3500,
                });
                return window.location.href = `/player/${data.videoId}`;
            };


        }).catch((err: Error) => {
            console.log(err);
        }).finally(() => setStartLoading(false));

    };


    const handleCancel = (event: any): any => {
        if (event) event.preventDefault();
        setFile(null);
        setProgress(0);
        Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
        setStartLoading(false);
        return enqueueSnackbar(t("index.cancelled"), {
            variant: "success",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
            },
            autoHideDuration: 3500,
        });
    };

    return (<React.Fragment>


        <Box position="absolute" left="50%" top="50%" style={{ transform: "translate(-50%, -50%)" }}>


            <Box boxShadow={3}>

                <Box bgcolor="background.paper" className={classes.CardImage}>
                    <div style={{ padding: "5px" }} />
                    <Image className="mask mask-hexagon max-w-sm select-none rounded-lg shadow-2xl" height={256} width={256} src={MyLogo} showLoading={<Loading />} errorIcon={<NewReleasesIcon />} draggable={false} />
                </Box>

                <Box bgcolor="background.paper" p={2}>
                    <div style={{ padding: "5px" }} />
                    <Grid justifyContent="center" container alignItems="center">
                        <label htmlFor="contained-button-file">
                            <Input required onChange={(e: any) => setFile(e.target.files[0])} accept="video/mp4" id="contained-button-file" type="file" />
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <VideoFileIcon />
                            </IconButton>
                        </label>
                    </Grid>
                    <div style={{ padding: "5px" }} />

                    {file ? (<Grid justifyContent="center" container alignItems="center"><Dotdotdot clamp={1} useNativeClamp><Typography variant="body1">{file.name.length > 15 ? file.name.substr(0, 5) + "..." : file.name}</Typography></Dotdotdot></Grid>) : ""}


                    <div style={{ padding: "5px" }} />
                    <Grid justifyContent="center" container alignItems="center">
                        {!file ?
                            (<Button onClick={(e: any) => { handleUpload(e) }} variant="contained" component="span">
                                {t("index.upload")}
                            </Button>)
                            :
                            (<React.Fragment>
                                <Grid spacing={2} container>
                                    {startLoading ? "" : (<Grid item>
                                        <Button onClick={(e: any) => { handleUpload(e) }} variant="contained" component="span">
                                            {t("index.startUpload")}
                                        </Button>
                                    </Grid>)}
                                    <Grid item>
                                        <Button onClick={(e: any) => { handleCancel(e) }} variant="contained" component="span">
                                            {t("index.cancel")}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </React.Fragment>)
                        }
                    </Grid>
                    <div style={{ padding: "5px" }} />

                    {file && startLoading ?
                        (<Grid justifyContent="center" container alignItems="center"><CircularProgressWithLabel value={progress} /></Grid>)
                        :
                        ""}


                </Box>
            </Box>
        </Box>



    </React.Fragment >)

};
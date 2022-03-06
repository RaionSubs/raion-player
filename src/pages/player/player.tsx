import { ReactTypes } from "../../types/reactPages";
import React, { useState, useEffect } from "react";
import ReactNetflixPlayer from "react-netflix-player";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../helpers/axios";
import { AxiosResponse } from "axios";
import Loading from "../../components/loading/loading";
import Error from "../error/error";

export default function App(): ReactTypes {

    const params = useParams();
    const [video, setVideo] = useState("");
    const [error, setError] = useState(false);
   


    useEffect(() => {

        axios.get("video?Id=" + params.Id).then((res: AxiosResponse) => {
            let data: any = res.data;

            if (data && data.content === "Missing query videoId" && data.code === 501) {
                setError(true);
            };

            if (data && data.content === "Video not found!" && data.code === 501) {
                setError(true);
            };

            if (data && !data.content && !data.code) {
                setVideo(`${process.env.REACT_APP_API_URL}video?Id=${params.Id}`);
            };

        }).catch((err: Error) => {
            console.log(err);
        });

    }, [params.Id]);

  
    if (!error) return (<React.Fragment>
        {video.length ? (<ReactNetflixPlayer
            src={video}
            playerLanguage="en"
            fullPlayer
            startPosition={0}
            primaryColor="#03dffc"
            secundaryColor="#ffffff"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            playbackRateStart={3}
            playbackRateOptions={['0.25', '0.5', '0.75', 'Normal', '1.25', '1.5', '2', '3']}
        />) : <Loading isCenter={true} />
        }
    </React.Fragment>); else if (error) return (<Error statusCode={403} />)

};
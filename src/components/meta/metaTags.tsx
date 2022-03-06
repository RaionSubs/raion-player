import React from "react";
import { ReactTypes } from "../../types/reactPages";
import { Helmet } from "react-helmet-async";
import MyLogo from "../../images/favicon.png";

export default function App(): ReactTypes {

    return (<Helmet>
        <title>{`${process.env.REACT_APP_SITENAME}`}</title>
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="Author" content={`${process.env.REACT_APP_WEBSITE_URL}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content={`${process.env.REACT_APP_SITE_DESCRIPTION}`} />
        <meta property="og:title" content={`${process.env.REACT_APP_SITENAME}`} />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="player, raion, subs, anime, video, videoplayer, upload" />
        <meta property="og:url" content={`${process.env.REACT_APP_WEBSITE_URL}`} />
        <meta property="og:description" content={`${process.env.REACT_APP_SITE_DESCRIPTION}`} />
        <meta property="og:image" content={MyLogo} />
        <meta property="og:site_name" content={`${process.env.REACT_APP_SITENAME}`} />
        <meta name="theme-color" content="#000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={MyLogo} />
    </Helmet >);

};
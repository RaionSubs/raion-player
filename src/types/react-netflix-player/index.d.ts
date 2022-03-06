declare module 'react-netflix-player' {

    import React from 'react';

    export interface PlayerProps {
        src: string | video;
        subTitle?: string;
        titleMedia?: string;
        extraInfoMedia?: string;
        playerLanguage?: string | "en" | "pt";
        overlayEnabled?: boolean | true;
        autoControllCloseEnabled?: boolean | true;
        fullPlayer?: boolean | true;
        backButton?: boolean | false;
        autoPlay?: boolean | false;
        startPosition?: number | 0;
        playbackRateEnable?: boolean | true;
        playbackRateOptions?: Array<string> | ['0.25', '0.5', '0.75', 'Normal', '1.25', '1.5', '2'];
        playbackRateStart?: number | 1;
        dataNext?: Object<any> | {};
        reprodutionList?: Array<any> | [];
        onCanPlay?: Function<any>;
        onTimeUpdate?: Function<any>;
        onEnded?: Function<any>;
        onErrorVideo?: Function<any>;
        onNextClick?: Function<any>;
        onClickItemListReproduction?: Function<any>;
        onCrossClick?: Function<any>;
        qualities?: Array<any> | [];
        primaryColor?: string | "#03dffc";
        primaryColor?: string | "#03dffc";
        secundaryColor ?: string | "#ffffff";
        fontFamily?: string | "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    };

    declare const VideoPlayer: React.SFC<PlayerProps>;

    export default VideoPlayer;

};
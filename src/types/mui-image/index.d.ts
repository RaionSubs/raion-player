declare module 'mui-image' {

    import React from 'react';

    export interface MuiImageProps {
        alt?: string;
        bgColor?: string;
        className?: string;
        distance?: string | number;
        duration?: number;
        easing?: string;
        errorIcon?: boolean | React.ReactNode;
        fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' | 'inherit' | 'initial' | 'revert' | 'unset';
        height?: string | number;
        iconWrapperClassName?: string;
        iconWrapperStyle?: any;
        position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky' | 'inherit' | 'initial' | 'revert' | 'unset';
        shift?: 'left' | 'right' | 'top' | 'bottom' | false | null;
        shiftDuration?: number;
        showLoading?: boolean | React.ReactNode;
        src: string;
        style?: any;
        width?: string | number;
        wrapperClassName?: string;
        wrapperStyle?: any;
        draggable?: boolean | true;
    };

    declare const Image: React.SFC<MuiImageProps>;

    export default Image;

};
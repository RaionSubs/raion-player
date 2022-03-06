import React from "react";
import { ReactTypes } from "../../types/reactPages";
import { Box, CircularProgress } from "@mui/material";

export default function App(props: ReactTypes): ReactTypes {
    const { isCenter }: ReactTypes = props;

    if (isCenter) return (<Box position="absolute" left="50%" top="50%" textAlign="center" style={{ transform: "translate(-50%, -50%)" }}>
        <CircularProgress />
    </Box>); else if (!isCenter) return (<CircularProgress />);

};
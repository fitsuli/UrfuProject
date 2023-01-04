import React from "react"
import { Stack, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

export const ErrorPage: React.FC = () => {

    return <Stack spacing={2} alignItems={"center"} justifyContent={"center"} height={"70%"}>
        <ErrorOutlineRoundedIcon sx={{ width: '64px', height: '64px'}} color={"primary"}/>
        <Typography variant={"h4"}>Что-то пошло не так, или страница не найдена</Typography>
    </Stack>
}
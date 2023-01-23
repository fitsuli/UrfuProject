import React from "react"
import { Stack, Typography } from "@mui/material"
import { AnimalVariant } from "../../Models/AnimalVariant"
import { AnimalsPage } from "./AnimalsPage"

export const FoundAnimalsPage: React.FC = () => {
    return <>
        <Stack>
            <Typography variant={"h4"} pl={"42px"} pb={"36px"}>Найденные питомцы</Typography>
            <AnimalsPage variant={AnimalVariant.Found} />
        </Stack>
    </>
}
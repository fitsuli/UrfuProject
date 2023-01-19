import React from "react"
import { CircularProgress, Fab, Grid, Stack, Typography } from "@mui/material"
import { Animal } from "../../Models/Animal"
import { useAnimalsQuery } from "../../QueryFetches/ApiHooks"
import { CircularProgressStyle } from "../../Styles/SxStyles"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from "react-router-dom"
import { AnimalVariant } from "../../Models/AnimalVariant"
import { AnimalCard } from "../Animals/AnimalCard"

export const FoundAnimalsPage: React.FC = () => {
    const { data: foundAnimals, isLoading } = useAnimalsQuery(AnimalVariant.Found)
    const navigate = useNavigate();

    if (isLoading) {
        return <CircularProgress sx={CircularProgressStyle} />
    }

    return <>
        <Typography variant={"h4"} pl={"42px"} pb={"36px"}>Найденные питомцы</Typography>
        <Grid container spacing={3} paddingX={'42px'}>
            {foundAnimals!.map((animal: Animal) =>
                <Grid key={animal.id} item xs={12} sm={6} md={3}>
                    <AnimalCard variant={AnimalVariant.Found} key={animal.id} animal={animal} />
                </Grid>)}
        </Grid>
    </>
}
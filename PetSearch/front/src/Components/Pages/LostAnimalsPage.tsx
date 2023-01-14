import React from "react"
import { CircularProgress, Fab, Grid } from "@mui/material"
import { Animal } from "../../Models/Animal"
import { useAnimalsQuery } from "../../QueryFetches/ApiHooks"
import { CircularProgressStyle } from "../../Styles/SxStyles"
import { AnimalCard } from "../Animals/AnimalCard"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from "react-router-dom"
import { AnimalVariant } from "../../Models/AnimalVariant"

export const LostAnimalsPage: React.FC = () => {
    const { data: lostAnimals, isLoading } = useAnimalsQuery(AnimalVariant.Lost)
    const navigate = useNavigate();

    if (isLoading) {
        return <CircularProgress sx={CircularProgressStyle} />
    }

    return <>
        <Grid container spacing={3} paddingX={'36px'}>
            {lostAnimals!.map((animal: Animal) =>
                <Grid key={animal.id} item xs={12} sm={6} md={3}>
                    <AnimalCard variant={AnimalVariant.Lost} key={animal.id} animal={animal} />
                </Grid>)}
        </Grid>

        <Fab color="primary" variant="extended" sx={{ position: "fixed", bottom: 24, right: 24 }} onClick={() => navigate("/addPost")}>
            <AddRoundedIcon sx={{ mr: 1 }} />
            Создать объявление
        </Fab>
    </>
}
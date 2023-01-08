import React from "react"
import { CircularProgress, Fab, Grid } from "@mui/material"
import { LostAnimalEntity } from "../../Models/LostAnimalEntity"
import { useLostAnimalsQuery } from "../../QueryFetches/ApiHooks"
import { CircularProgressStyle } from "../../Styles/SxStyles"
import { LostAnimalCard } from "../LostAnimals/LostAnimalCard"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from "react-router-dom"

export const LostAnimalsPage: React.FC = () => {
    const { data: lostAnimals, isLoading } = useLostAnimalsQuery()
    const navigate = useNavigate();

    if (isLoading) {
        return <CircularProgress sx={CircularProgressStyle} />
    }

    return <>
        <Grid container spacing={3} paddingX={'36px'}>
            {lostAnimals!.map((animal: LostAnimalEntity) =>
                <Grid key={animal.id} item xs={12} sm={6} md={3}>
                    <LostAnimalCard key={animal.id} animal={animal} />
                </Grid>)}
        </Grid>

        <Fab color="primary" variant="extended" sx={{ position: "fixed", bottom: 24, right: 24 }} onClick={() => navigate("/addPost")}>
            <AddRoundedIcon sx={{ mr: 1 }} />
            Создать объявление
        </Fab>
    </>
}
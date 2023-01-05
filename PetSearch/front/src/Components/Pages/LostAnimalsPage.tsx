import React from "react"
import { CircularProgress, Grid } from "@mui/material"
import { LostAnimalEntity } from "../../Models/LostAnimalEntity"
import { useLostAnimalsQuery } from "../../QueryFetches/ApiHooks"
import { CircularProgressStyle } from "../../Styles/SxStyles"
import { AddLostAnimalButton } from "../LostAnimals/AddLostAnimalButton"
import { LostAnimalCard } from "../LostAnimals/LostAnimalCard"


export const LostAnimalsPage: React.FC = () => {
    const { data: lostAnimals, isLoading } = useLostAnimalsQuery()

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

        <AddLostAnimalButton />
    </>
}
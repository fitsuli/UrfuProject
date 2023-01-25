import { CircularProgress, Grid } from "@mui/material"
import React, { useMemo } from "react"
import { Animal } from "../../Models/Animal"
import { AnimalVariant } from "../../Models/AnimalVariant"
import { useAnimalsQuery } from "../../QueryFetches/ApiHooks"
import { CircularProgressStyle } from "../../Styles/SxStyles"
import { AnimalCard } from "./AnimalCard"

export const AnimalsGrid: React.FC<{
    variant: AnimalVariant,
    query: string
}> = ({ variant, query }) => {
    const { data: animals, isLoading: isAnimalsLoading } = useAnimalsQuery(variant, query)

    const animalCards = useMemo(() => {
        if (!animals)
            return [];

        return animals!.map((animal: Animal, i) =>
        <Grid key={i} item xs={12} sm={6} md={3}>
            <AnimalCard variant={variant} key={i} animal={animal} />
        </Grid>)
        }, [animals])

    if (isAnimalsLoading) {
        return <CircularProgress sx={CircularProgressStyle} />
    }

    return <Grid container spacing={3} paddingX={'42px'}>
        {animalCards}
    </Grid>
}
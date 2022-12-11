import { CircularProgress, Grid, Stack } from "@mui/material"
import { LostAnimalEntity } from "../../Models/LostAnimalEntity"
import { useLostAnimalsQuery } from "../../QueryFetches/ApiHooks"
import { CircularProgressStyle } from "../../Styles/SxStyles"
import { LostAnimalCard } from "../LostAnimals/LostAnimalCard"

export const LostAnimalsPage: React.FC = () => {
    const { data: lostAnimals, isLoading } = useLostAnimalsQuery()

    if (isLoading) {
        return <CircularProgress sx={CircularProgressStyle} />
    }

    return <Grid container spacing={3}>
        {lostAnimals!.map((animal: LostAnimalEntity) =>
            <Grid item xs={12} sm={6} md={4}>
                <LostAnimalCard key={animal.id} animal={animal} />
            </Grid>)}
    </Grid>
}
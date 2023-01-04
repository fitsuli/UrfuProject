import React from "react"
import { useParams } from "react-router-dom"
import { CircularProgress, Stack, Typography } from "@mui/material"
import { CircularProgressStyle } from "../../Styles/SxStyles"
import { useLostAnimalQuery } from "../../QueryFetches/ApiHooks"
import { ErrorPage } from "../Pages/ErrorPage"
import { ImageUrlCarousel } from "../Carousel/Carousel"

export const LostAnimalInnerPage: React.FC = () => {
    const { lostAnimalId } = useParams()
    const { data: lostAnimal, isLoading, isError } = useLostAnimalQuery(lostAnimalId!);

    if (isLoading) {
        return <CircularProgress sx={CircularProgressStyle} />
    }

    if (isError) {
        return <ErrorPage />
    }

    const carouselStyleProps = {
        height: "550px",
    }

    return <>
        <Stack direction={"row"}>
            <Stack direction={"column"} flexBasis={"50%"} spacing={3} pr={2}>
                {lostAnimal?.fileNames && <ImageUrlCarousel sourceUrls={lostAnimal?.fileNames} {...carouselStyleProps} />}
            </Stack>
            <Stack direction={"column"} flexBasis={"50%"} spacing={3} pl={2}>
                <Typography variant="h5">{lostAnimal?.animalName}</Typography>
                <Typography variant="h6">{lostAnimal?.animalType}</Typography>
                <Typography variant="body1">{lostAnimal?.description}</Typography>

            </Stack>
        </Stack>
    </>
}
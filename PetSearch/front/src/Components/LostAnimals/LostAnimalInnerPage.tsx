import React, { useMemo } from "react"
import { useParams } from "react-router-dom"
import { Card, CircularProgress, Divider, Stack, Typography } from "@mui/material"
import { CircularProgressStyle } from "../../Styles/SxStyles"
import { useLostAnimalQuery } from "../../QueryFetches/ApiHooks"
import { ErrorPage } from "../Pages/ErrorPage"
import { ImageUrlCarousel } from "../Carousel/Carousel"
import { Gender } from "../../Models/Gender";
import { format } from 'date-fns-tz'
import { parseISO } from "date-fns";
import plural from 'ru-plurals';
import { YMaps, Map } from "@pbe/react-yandex-maps";

export const LostAnimalInnerPage: React.FC = () => {
    const { lostAnimalId } = useParams()
    const { data: lostAnimal, isLoading, isError } = useLostAnimalQuery(lostAnimalId!);

    const lostDate = useMemo(() => lostAnimal && parseISO(lostAnimal.lostDate), [lostAnimal])
    const utcDate = useMemo(() => lostDate && format(lostDate, 'dd.MM.yyyy HH:mm'), [lostDate])
    const pluralizedAge = useMemo(() => plural('год', 'года', 'лет'), [])

    if (isLoading) {
        return <CircularProgress sx={CircularProgressStyle} />
    }

    if (isError) {
        return <ErrorPage />
    }

    const carouselStyleProps = {
        height: "550px",
    }

    return <Stack spacing={3} paddingX={'36px'}>
        <Typography variant="h4">{lostAnimal?.gender == Gender.Male ? "Потерялся" : "Потерялась"} {lostAnimal?.animalName}</Typography>

        <Stack direction={"row"}>
            <Stack direction={"column"} flexBasis={"50%"} spacing={3} pr={2}>
                {lostAnimal?.fileNames && <ImageUrlCarousel sourceUrls={lostAnimal?.fileNames} {...carouselStyleProps} />}
            </Stack>
            <Stack spacing={3} flexBasis={"50%"}>
                <Card>
                    <Stack direction={"column"} spacing={3} pl={2} p={3}>
                        <Typography variant="h5">Подробная информация</Typography>
                        <Typography variant="body1">{lostAnimal?.description}</Typography>
                        <Divider sx={{ borderStyle: 'dashed' }} />

                        <Card>
                            <Stack direction={"row"} spacing={5} p={3}>
                                <Stack direction={"column"} spacing={2}>
                                    <Typography variant="caption">ЖИВОТНОЕ</Typography>
                                    <Typography variant="body1">{lostAnimal?.animalType}</Typography>
                                </Stack>

                                <Stack direction={"column"} spacing={2}>
                                    <Typography variant="caption">ПОЛ</Typography>
                                    <Typography variant="body1">
                                        {lostAnimal?.gender == Gender.Male ? "Мужской" : "Женский"}
                                    </Typography>
                                </Stack>

                                <Stack direction={"column"} spacing={2}>
                                    <Typography variant="caption">ВОЗРАСТ</Typography>
                                    <Typography variant="body1">{pluralizedAge(lostAnimal?.age)}</Typography>
                                </Stack>

                            </Stack>
                        </Card>
                    </Stack>
                </Card>

                <Card>
                    <Stack direction={"column"} spacing={3} p={3}>
                        <Typography variant="h5">Место и время пропажи</Typography>
                        <Typography variant="body1">Место пропажи: {lostAnimal?.lostAddressFull}</Typography>
                        <Typography variant="body1">Дата пропажи: {utcDate}</Typography>

                        <Divider sx={{ borderStyle: 'dashed' }} />

                        <Card>
                            <YMaps >
                                <Map
                                    defaultState={{
                                        center: [55.75, 37.57],
                                        zoom: 9,
                                        controls: ['zoomControl'],
                                    }}
                                    modules={['control.ZoomControl']}
                                    style={{
                                        aspectRatio: '2/1'
                                    }} />
                            </YMaps>
                        </Card>
                    </Stack>
                </Card>

            </Stack>
        </Stack>
    </Stack>
}
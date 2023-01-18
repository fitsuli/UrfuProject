import { Card, Stack, CircularProgress, Box, Divider, Typography, useTheme } from "@mui/material"
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { format } from 'date-fns-tz'
import { parseISO } from "date-fns";
import React, { useState } from "react"
import { AnimalVariant } from "../../Models/AnimalVariant";
import { useAnimalsQuery } from "../../QueryFetches/ApiHooks";
import { CircularProgressStyle } from "../../Styles/SxStyles";
import { ErrorPage } from "./ErrorPage";

export const AnimalsMap: React.FC = () => {
    const [animalVariant, setAnimalVariant] = useState(AnimalVariant.Lost)
    const { data: animals, isLoading, isError } = useAnimalsQuery(animalVariant)
    const theme = useTheme()
    const mapState = React.useMemo(
        () => ({
            center: [56.826961, 60.603849],
            zoom: 13,
            controls: ['zoomControl']
        }),
        []
    )

    if (isLoading) {
        return <CircularProgress sx={CircularProgressStyle} />
    }

    if (isError) {
        return <ErrorPage />
    }

    return <Stack direction={"row"} spacing={2} sx={{ height: "100%" }}>
        <Card sx={{
            flexBasis: '30%',
            maxHeight: "100%",
            overflowY: "scroll",
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
                display: "none"
            }
        }}>
            <Stack spacing={2}>
                {animals?.map((animal, i) => {
                    return <div key={i}>
                        <Box>
                            <Stack direction={"row"} spacing={2} p={3}>
                                <Box sx={{
                                    flexBasis: "40%",
                                    width: "150px",
                                    height: "150px",
                                    backgroundImage: animal.fileNames?.length ? `url(/AnimalsImages/${animal.fileNames[0]})` : "url(https://www.freeiconspng.com/thumbs/animal-icon-png/animal-paw-vector-icon-animals-icons-icons-download-0.png)",
                                    backgroundPosition: "center center",
                                    backgroundSize: "cover",
                                    borderRadius: 1
                                }}>
                                </Box>
                                <Stack spacing={1} flexBasis={"60%"} justifyContent={"space-between"}>
                                    <>
                                        <Typography variant={"h5"}>{animal.animalType}</Typography>
                                        <Typography variant={"body1"}>{animal.animalName}</Typography>
                                        <Typography variant={"body1"} sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitLineClamp: "2",
                                            WebkitBoxOrient: "vertical",
                                            wordBreak: "break-all"
                                        }}>{animal.description}</Typography>
                                    </>
                                    <Typography color={theme.palette.grey[600]} variant={"body2"}>{format(parseISO(animal.date), 'dd.MM.yyyy')}</Typography>
                                </Stack>
                            </Stack>
                        </Box>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                    </div>
                })}
            </Stack>
        </Card>
        <Card sx={{ flexBasis: '70%' }}>
            <YMaps>
                <Map
                    state={mapState}
                    modules={['control.ZoomControl']}
                    style={{
                        height: '100%'
                    }}>
                </Map>
            </YMaps>
        </Card>
    </Stack>
}
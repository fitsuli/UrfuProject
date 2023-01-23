import { Card, Stack, CircularProgress, Box, Divider, Typography, useTheme } from "@mui/material"
import { YMaps, Map, ObjectManager } from "@pbe/react-yandex-maps";
import { format } from 'date-fns-tz'
import { parseISO } from "date-fns";
import React, { useMemo, useState } from "react"
import { AnimalVariant } from "../../Models/AnimalVariant";
import { useAnimalsQuery } from "../../QueryFetches/ApiHooks";
import { CircularProgressStyle } from "../../Styles/SxStyles";
import { ErrorPage } from "./ErrorPage";
import { FilterPopover } from "../Common/FilterPopover";
import { BuildQuery } from "../Common/QueryBuilder";
import { AnimalFilterType } from "../../Models/AnimalFilterType";

export const AnimalsMap: React.FC = () => {
    const [animalVariant, setAnimalVariant] = useState(AnimalVariant.Lost)
    const [animalFilterType, setAnimalFilterType] = useState<AnimalFilterType | null>(null)
    const [query, setQuery] = useState(BuildQuery(true, null, animalFilterType))
    const { data: animals, isLoading, isError } = useAnimalsQuery(animalVariant, query)
    const theme = useTheme()
    const [mapState, setMapState] = useState(
        {
            center: [56.826961, 60.603849],
            zoom: 14,
            controls: ['zoomControl']
        }
    )

    const onSearch = (variant: AnimalVariant, animalFilterType: AnimalFilterType | null) => {
        setAnimalVariant(variant);
        setAnimalFilterType(animalFilterType)
        setQuery(BuildQuery(true, null, animalFilterType))
    }

    const placemarks = useMemo(() => animals?.map(animal => {
        let feature: Feature = {
            type: "Feature", id: animal.id, geometry: {
                type: "Point",
                coordinates: animal.geoPosition.split(" ").map(x => Number(x)).reverse()
            },
            properties: {
                balloonContent: `<div style="display: flex; align-items: center; margin: 10px">
                <style type="text/css">
                    .text {
                        font-family: Roboto, Helvetica, Arial, sans-serif;
                        font-weight: normal;
                        margin: 0;
                    }

                    h3.text {
                        font-size: 1.5em;
                    }

                    h4.text {
                        font-size: 1.2em;

                    }
                </style>
                <img src="${`/AnimalsImages/${animal.fileNames[0]}`}" style="width: 100px; height: 100px; object-fit: cover;" />
                <div style="padding-left: 16px; display: flex; flex-direction: column; gap: 8px">
                <h3 class="text">${animal.animalType}</h3>
                ${animal.animalName ? `<h4 class="text">${animal.animalName}</h4>` : ""}
                <p class="text">${animal.addressFull}</p>
                <a class="text" href="${animalVariant == AnimalVariant.Lost ? `lost/${animal.id}` : `found/${animal.id}`}">Перейти к объявлению</a>
                </div>
                </div>`,
                hintContent: ""
            }
        }
        return feature;
    }), [animals, mapState])

    const handleItemClick = (coordinates: string) => {
        const coordinatesArray = coordinates.split(" ").map(x => Number(x)).reverse()
        setMapState({
            ...mapState,
            center: coordinatesArray,
            controls: ['zoomControl']
        })
    }

    if (isLoading) {
        return <CircularProgress sx={CircularProgressStyle} />
    }

    if (isError) {
        return <ErrorPage />
    }

    return <Stack spacing={3} paddingX={'36px'} sx={{ height: "100%" }}>
        <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
            {animalVariant == AnimalVariant.Lost ?
                <Typography variant={"h4"}>Карта потерянных питомцев</Typography> :
                <Typography variant={"h4"}>Карта найденных питомцев</Typography>}

            <FilterPopover onFilter={onSearch}/>
        </Stack>
        <Stack direction={"row"} spacing={3} maxHeight={"100%"}>
            <Card sx={{
                flexBasis: '30%',
                overflowY: "scroll",
                scrollbarWidth: "none",
                "::-webkit-scrollbar": {
                    display: "none"
                }
            }}>
                <Stack spacing={2}>
                    {animals?.map((animal, i) => {
                        return <Box key={i} onClick={() => handleItemClick(animal.geoPosition)} sx={{
                            "&:hover": {
                                cursor: "pointer",
                                backgroundColor: theme.palette.grey[100]
                            }
                        }}>
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
                                                wordBreak: "break-word"
                                            }}>{animal.addressFull}</Typography>

                                        </>
                                        <Typography color={theme.palette.grey[600]} variant={"body2"}>{format(parseISO(animal.date), 'dd.MM.yyyy')}</Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                            <Divider sx={{ borderStyle: 'dashed' }} />
                        </Box>
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
                        <ObjectManager
                            objects={{
                                preset: 'islands#greenDotIcon',
                                iconColor: '#3caa3c',
                                openBalloonOnClick: true
                            }}
                            clusters={{
                                preset: 'islands#greenClusterIcons',
                                iconColor: '#3caa3c',
                            }}
                            features={placemarks}
                            modules={['objectManager.addon.objectsBalloon',
                                'objectManager.addon.objectsHint']}
                            options={{
                                clusterize: true,
                                gridSize: 32,
                            }}
                        />
                    </Map>
                </YMaps>
            </Card>
        </Stack>
    </Stack>
}

interface Feature {
    type: string;
    id: string;
    geometry: Geometry;
    properties: Properties;
}

interface Geometry {
    type: string;
    coordinates: number[];
}

interface Properties {
    balloonContent: string;
    hintContent: string;
}
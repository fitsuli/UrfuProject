import React, { useMemo } from "react"
import { useParams } from "react-router-dom"
import { Avatar, Button, Card, CircularProgress, Divider, Stack, Typography } from "@mui/material"
import { CircularProgressStyle } from "../../Styles/SxStyles"
import { useLostAnimalQuery } from "../../QueryFetches/ApiHooks"
import { ErrorPage } from "../Pages/ErrorPage"
import { ImageUrlCarousel } from "../Carousel/Carousel"
import { Gender } from "../../Models/Gender";
import { format } from 'date-fns-tz'
import { parseISO } from "date-fns";
import { useAuth } from "../Auth/AuthProvider";
import plural from 'ru-plurals';
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import stringAvatar from '../../Utils/AvatarString';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';


export const LostAnimalInnerPage: React.FC = () => {
    const { lostAnimalId } = useParams()
    const auth = useAuth()
    const { data: lostAnimal, isLoading, isError } = useLostAnimalQuery(lostAnimalId!);

    const lostDate = useMemo(() => lostAnimal && parseISO(lostAnimal.lostDate), [lostAnimal])
    const utcDate = useMemo(() => lostDate && format(lostDate, 'dd.MM.yyyy HH:mm'), [lostDate])
    const pluralizedAge = useMemo(() => plural('год', 'года', 'лет'), [])

    const mapState = React.useMemo(
        () => ({
            center: lostAnimal?.lostGeoPosition ? lostAnimal.lostGeoPosition.split(" ").map(x => Number(x)).reverse() : [55.75, 37.57],
            zoom: 13,
            controls: ['zoomControl']
        }),
        [lostAnimal]
    );

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
        <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h4">{lostAnimal?.gender == Gender.Male ? "Потерялся" : "Потерялась"} {lostAnimal?.animalName}</Typography>
            {auth.user.id == lostAnimal?.userId && <Button variant="outlined">Закрыть объявление</Button>}
        </Stack>

        <Stack direction={"row"}>
            <Stack direction={"column"} flexBasis={"50%"} spacing={3} pr={2}>
                {lostAnimal?.fileNames && <ImageUrlCarousel sourceUrls={lostAnimal?.fileNames} {...carouselStyleProps} />}

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

            </Stack>
            <Stack spacing={3} flexBasis={"50%"}>
                <Card>
                    <Stack direction={"column"} spacing={3} p={3}>
                        <Typography variant="h5">Контакты</Typography>
                        <Stack direction={"row"} spacing={2}>
                            <Avatar {...stringAvatar(lostAnimal ? lostAnimal.contacts.name : "A A")} />
                            <Typography variant="h6" alignSelf={"center"}>{lostAnimal?.contacts.name}</Typography>
                        </Stack>

                        <Stack direction={"column"} spacing={3} p={1}>

                            <Stack direction={"row"} spacing={2}>
                                <PhoneRoundedIcon />
                                <Typography variant="body1">Телефон: {lostAnimal?.contacts.phone}</Typography>
                            </Stack>

                            {lostAnimal?.contacts.email &&
                                <Stack direction={"row"} spacing={2}>
                                    <EmailRoundedIcon />
                                    <Typography variant="body1">Почта: {lostAnimal.contacts.email}</Typography>
                                </Stack>}
                            {lostAnimal?.contacts.telegram &&
                                <Stack direction={"row"} spacing={2}>
                                    <TelegramIcon />
                                    <Typography variant="body1">Telegram: {lostAnimal.contacts.telegram}</Typography>
                                </Stack>}
                            {lostAnimal?.contacts.vk &&
                                <Stack direction={"row"} spacing={2}>
                                    <TagRoundedIcon />
                                    <Typography variant="body1">Вконтакте: {lostAnimal.contacts.vk}</Typography>
                                </Stack>}
                        </Stack>
                    </Stack>
                </Card>

                <Card>
                    <Stack direction={"column"} spacing={3} p={3}>
                        <Typography variant="h5">Место и время пропажи</Typography>
                        {lostAnimal?.lostAddressCity && <Typography variant="body1">Город: {lostAnimal.lostAddressCity}</Typography>}
                        <Typography variant="body1">Место пропажи: {lostAnimal?.lostAddressFull}</Typography>
                        <Typography variant="body1">Дата пропажи: {utcDate}</Typography>

                        <Divider sx={{ borderStyle: 'dashed' }} />

                        <Card>
                            <YMaps >
                                <Map
                                    state={mapState}
                                    modules={['control.ZoomControl']}
                                    style={{
                                        aspectRatio: '2/1'
                                    }}>
                                    <Placemark defaultGeometry={mapState.center} />
                                </Map>
                            </YMaps>
                        </Card>
                    </Stack>
                </Card>
            </Stack>
        </Stack >
    </Stack >
}
import React, { useMemo, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useSnackbar } from "notistack";
import { Avatar, Button, Card, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, Modal, Radio, RadioGroup, Stack, Typography } from "@mui/material"
import { CircularProgressStyle } from "../../Styles/SxStyles"
import { useAnimalQuery, useClosePostMutation, useDeleteAnimalMutation } from "../../QueryFetches/ApiHooks"
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
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { AnimalVariant } from "../../Models/AnimalVariant"

export const AnimalInnerPage: React.FC = () => {
    const { lostAnimalId: animalId } = useParams()
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const animalVariant = useMemo(() => getAnimalVariant(location.pathname), [location])
    const { enqueueSnackbar } = useSnackbar();
    const { data: animal, isLoading, isError } = useAnimalQuery(animalVariant, animalId!);

    const deleteMutation = useDeleteAnimalMutation(animalVariant, () => enqueueSnackbar("Объявление закрыто", { variant: "success" }))
    const closePostMutation = useClosePostMutation(animalVariant, () => enqueueSnackbar("Объявление закрыто", { variant: "success" }))
    const foundCloseReason = animalVariant == AnimalVariant.Lost ? "Я нашёл питомца" : "Я нашёл хозяина"

    const [modalVisible, setModalVisible] = useState(false);
    const [closeReason, setCloseReason] = useState(foundCloseReason);

    const lostDate = useMemo(() => animal && parseISO(animal.date), [animal])
    const utcDate = useMemo(() => lostDate && format(lostDate, 'dd.MM.yyyy HH:mm'), [lostDate])
    const pluralizedAge = useMemo(() => plural('год', 'года', 'лет'), [])

    const mapState = React.useMemo(
        () => ({
            center: animal?.geoPosition ? animal.geoPosition.split(" ").map(x => Number(x)).reverse() : [55.75, 37.57],
            zoom: 13,
            controls: ['zoomControl']
        }),
        [animal]
    );

    const handlePostClose = async () => {
        if (closeReason == foundCloseReason) {
            await closePostMutation.mutateAsync(animal!)
        } else {
            await deleteMutation.mutateAsync(animal!);
        }

        animalVariant == AnimalVariant.Lost ? navigate("/lost") : navigate("/found")
    }

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
            {animalVariant == AnimalVariant.Lost && (animal?.gender == Gender.Female ?
                <Typography variant="h4">Потерялась {animal?.animalName}</Typography>
                : <Typography variant="h4">Потерялся {animal?.animalName}</Typography>
            )}
            {
                animalVariant == AnimalVariant.Found &&
                <Typography variant="h4">Нашлась {animal?.animalType.toLowerCase()}</Typography>
            }

            {auth.user.id == animal?.userId && !animal?.isClosed && <Button variant="outlined"
                onClick={() => setModalVisible(true)}>Закрыть объявление</Button>}

            {animal?.isClosed && <Chip sx={{
            }} color={"primary"} label={animalVariant == AnimalVariant.Lost ? "Питомец найден" : "Хозяин найден"} icon={<CheckCircleOutlineRoundedIcon />} />
            }
        </Stack>

        <Stack direction={"row"}>
            <Stack direction={"column"} flexBasis={"50%"} spacing={3} pr={2}>
                {animal?.fileNames && <ImageUrlCarousel sourceUrls={animal?.fileNames} {...carouselStyleProps} />}

                <Card>
                    <Stack direction={"column"} spacing={3} pl={2} p={3}>
                        <Typography variant="h5">Подробная информация</Typography>
                        <Typography variant="body1">{animal?.description}</Typography>
                        <Divider sx={{ borderStyle: 'dashed' }} />

                        <Card>
                            <Stack direction={"row"} spacing={5} p={3}>
                                <Stack direction={"column"} spacing={2}>
                                    <Typography variant="caption">ЖИВОТНОЕ</Typography>
                                    <Typography variant="body1">{animal?.animalType}</Typography>
                                </Stack>

                                <Stack direction={"column"} spacing={2}>
                                    <Typography variant="caption">ПОЛ</Typography>
                                    <Typography variant="body1">
                                        {animal?.gender == Gender.Male ? "Мужской" : "Женский"}
                                    </Typography>
                                </Stack>

                                <Stack direction={"column"} spacing={2}>
                                    <Typography variant="caption">ВОЗРАСТ</Typography>
                                    <Typography variant="body1">{pluralizedAge(animal?.age)}</Typography>
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
                            <Avatar {...stringAvatar(animal ? animal.contacts.name : "A A")} />
                            <Typography variant="h6" alignSelf={"center"}>{animal?.contacts.name}</Typography>
                        </Stack>

                        <Stack direction={"column"} spacing={3} p={1}>

                            <Stack direction={"row"} spacing={2}>
                                <PhoneRoundedIcon />
                                <Typography variant="body1">Телефон: {animal?.contacts.phone}</Typography>
                            </Stack>

                            {animal?.contacts.email &&
                                <Stack direction={"row"} spacing={2}>
                                    <EmailRoundedIcon />
                                    <Typography variant="body1">Почта: {animal.contacts.email}</Typography>
                                </Stack>}
                            {animal?.contacts.telegram &&
                                <Stack direction={"row"} spacing={2}>
                                    <TelegramIcon />
                                    <Typography variant="body1">Telegram: {animal.contacts.telegram}</Typography>
                                </Stack>}
                            {animal?.contacts.vk &&
                                <Stack direction={"row"} spacing={2}>
                                    <TagRoundedIcon />
                                    <Typography variant="body1">Вконтакте: {animal.contacts.vk}</Typography>
                                </Stack>}
                        </Stack>
                    </Stack>
                </Card>

                <Card>
                    <Stack direction={"column"} spacing={3} p={3}>
                        <Typography variant="h5">Место и время пропажи</Typography>
                        {animal?.addressCity && <Typography variant="body1">Город: {animal.addressCity}</Typography>}
                        <Typography variant="body1">Место пропажи: {animal?.addressFull}</Typography>
                        <Typography variant="body1">Дата пропажи: {utcDate}</Typography>

                        <Divider sx={{ borderStyle: 'dashed' }} />

                        <Card>
                            <YMaps>
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
        <Dialog
            open={modalVisible}
            onClose={() => setModalVisible(false)}>
            <DialogTitle>Почему вы хотите закрыть объявление?</DialogTitle>
            <DialogContent>
                <FormControl sx={{ padding: 2 }}>
                    <RadioGroup
                        value={closeReason}
                        name="radio-buttons-group"
                        onChange={(event) => setCloseReason(event.target.value)}
                    >
                        <FormControlLabel control={<Radio />} label={foundCloseReason} value={foundCloseReason} />
                        <FormControlLabel control={<Radio />} label={"Я просто хочу закрыть объявление"} value={"Я просто хочу закрыть объявление"} />
                    </RadioGroup>
                </FormControl>
            </DialogContent>

            <DialogActions>

                <Button onClick={() => setModalVisible(false)}>Отмена</Button>
                <Button onClick={() => handlePostClose()}>Подтвердить</Button>
            </DialogActions>
        </Dialog>
    </Stack >

}

const getAnimalVariant = (pathname: string) => {
    if (pathname.includes("lost"))
        return AnimalVariant.Lost
    return AnimalVariant.Found
}
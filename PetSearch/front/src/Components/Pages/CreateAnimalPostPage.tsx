import { Typography, TextField, Box, Button, Stack, Card, RadioGroup, FormControlLabel, Radio, FormControl, ToggleButtonGroup, ToggleButton, Divider, InputAdornment } from "@mui/material"
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { RoundedStyle } from "../../Styles/SxStyles";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useSaveAnimalMutation } from "../../QueryFetches/ApiHooks";
import Dropzone from "react-dropzone";
import { AttachmentsCard } from "../Common/AttachmentCard";
import { CreateAnimalDto } from "../../Models/CreateAnimalDto";
import { ImageFileCarousel } from "../Carousel/Carousel";
import React from "react";
import { Gender } from "../../Models/Gender";
import { GeocodeSearch } from "../Map/GeocodeSearch";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { MuiTelInput } from 'mui-tel-input';
import { styled } from '@mui/material/styles';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useNavigate } from "react-router-dom";
import { AnimalVariant } from "../../Models/AnimalVariant";

enum CurrentPage {
    First,
    Second,
}

const MuiTelInputStyled = styled(MuiTelInput)`
  & .MuiTelInput-Flag {
    display: none;
  }
`

export const CreateAnimalPostPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<CurrentPage>(CurrentPage.First)
    const [postType, setPostType] = useState<AnimalVariant>(AnimalVariant.Lost)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [date, setDate] = useState<Date>(new Date())
    const [other, setOther] = useState<Boolean>(false)
    const [validMail, setValidMail] = useState<Boolean>(false);
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [animal, setAnimal] = useState<CreateAnimalDto>({
        animalName: "",
        animalType: "Собака",
        addressFull: "",
        addressCity: "",
        geoPosition: "",
        date: "",
        postCreationDate: "",
        description: "",
        age: 0,
        gender: Gender.Male,
        contacts: {
            name: "",
            phone: "",
            email: "",
            telegram: "",
            vk: ""
        },
        files: []
    })

    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnimal({ ...animal, [prop]: event.target.value });
    };

    const onFileDrop = (acceptedFiles: File[]) => {
        const uniqueFiles = selectedFiles.concat(acceptedFiles).filter((f1, pos, arr) =>
            arr.findIndex((f2) => f2.name === f1.name) === pos)
        setSelectedFiles(uniqueFiles)
    }

    const onDelete = (selectedFile: File) => {
        setSelectedFiles(selectedFiles.filter((file) => selectedFile !== file))
    }


    const onSubmit = async () => {
        const saveMutation = useSaveAnimalMutation(postType, () => enqueueSnackbar("Объявление создано!", { variant: "success" }))
        animal.date = date.toISOString()
        animal.postCreationDate = new Date().toISOString()
        animal.files = selectedFiles
        const mutationResult = await saveMutation.mutateAsync(animal)
        postType == AnimalVariant.Lost ? navigate(`/lost/${mutationResult.id}`) : navigate(`/found/${mutationResult.id}`)
    }

    return <>
        <Typography variant="h4" sx={{ ml: 3 }}>Создать объявление</Typography>
        <Card sx={{ m: 3, p: 4 }}>
            <Stack spacing={4}>
                <Stack direction={"row"}>
                    <Stack direction={"column"} flexBasis={"50%"} spacing={3} pr={4} justifyContent={"space-between"}>
                        {currentPage == CurrentPage.First &&
                            <>
                                <Typography variant="h6">Выберите тип объявления</Typography>
                                <ToggleButtonGroup fullWidth sx={{ justifyContent: "center" }} color="primary" size="large" value={postType} exclusive={true} onChange={(event, value) => setPostType(value)}>
                                    <ToggleButton value={AnimalVariant.Lost} key={AnimalVariant.Lost}>
                                        Я потерял питомца
                                    </ToggleButton>
                                    <ToggleButton value={AnimalVariant.Found} key={AnimalVariant.Found}>
                                        Я нашел питомца
                                    </ToggleButton>
                                </ToggleButtonGroup>

                                <Typography variant="h6">Выберите тип питомца</Typography>
                                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                    <Card variant={"outlined"} sx={{ borderRadius: 1 }}>
                                        <FormControl sx={{ padding: 2 }}>
                                            <RadioGroup
                                                row
                                                aria-labelledby="radio-buttons-group-label"
                                                name="radio-buttons-group"
                                                defaultValue={"Собака"}
                                                onChange={handleChange("animalType")}
                                            >
                                                <FormControlLabel control={<Radio />} label={"Собака"} value={"Собака"} onChange={() => setOther(false)} />
                                                <FormControlLabel control={<Radio />} label={"Кошка"} value={"Кошка"} onChange={() => setOther(false)} />
                                                <FormControlLabel control={<Radio />} label={"Другой"} value={"Другой"} onChange={() => setOther(true)} />
                                            </RadioGroup>
                                        </FormControl>
                                    </Card>
                                    {other && <TextField label={"Тип питомца"}
                                        onChange={handleChange("animalType")}
                                        sx={{ flexGrow: 1 }} />}
                                </Stack>

                                <Typography variant="h6">Выберите пол и возраст питомца</Typography>
                                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                    <Card variant={"outlined"} sx={{ borderRadius: 1 }}>
                                        <FormControl sx={{ padding: 2 }}>
                                            <RadioGroup
                                                row
                                                aria-labelledby="radio-buttons-group-label"
                                                value={animal.gender}
                                                name="radio-buttons-group"
                                                onChange={handleChange("gender")}
                                            >
                                                <FormControlLabel control={<Radio />} label={"Мужской"} value={Gender.Male} />
                                                <FormControlLabel control={<Radio />} label={"Женский"} value={Gender.Female} />
                                                {postType == AnimalVariant.Found &&
                                                    <FormControlLabel control={<Radio />} label={"Не знаю"} value={Gender.Unknown} />
                                                }
                                            </RadioGroup>
                                        </FormControl>
                                    </Card>
                                    <TextField
                                        id="outlined-number"
                                        label="Возраст"
                                        type="number"
                                        InputProps={{ inputProps: { min: "0", max: "25", step: "1" } }}
                                        onChange={handleChange("age")}
                                        value={animal.age}
                                    />
                                </Stack>
                            </>
                        }

                        {currentPage == CurrentPage.Second && <><Stack spacing={3}>
                            <Typography variant="h6">Дополнительная информация о питомце</Typography>
                            {postType == AnimalVariant.Lost && <TextField label={"Кличка питомца"} onChange={handleChange("animalName")} autoFocus={true} />}
                            <TextField
                                multiline
                                rows={5}
                                label={"Дополнительная информация"}
                                onChange={handleChange("description")} />

                            <Typography variant="h6">Место и дата {postType == AnimalVariant.Found ? "пропажи" : "находки"}</Typography>
                            <Stack direction={"row"} spacing={2}>
                                <DateTimePicker
                                    maxDateTime={new Date()}
                                    label={"Когда потеряли"}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                    value={date}
                                    inputFormat="dd.MM.yyyy HH:mm"
                                    onChange={(newValue) => {
                                        newValue && setDate(newValue);
                                    }}
                                />
                            </Stack>


                            <GeocodeSearch lostAnimalEntity={animal}
                                handleChange={(prop: string, value: string | undefined) => {
                                    setAnimal(previousState => ({ ...previousState, [prop]: value }))
                                }
                                } />

                        </Stack>

                            <Button variant={"outlined"} sx={{ alignSelf: "flex-start" }} onClick={() => setCurrentPage(CurrentPage.First)}>Назад</Button>
                        </>}


                    </Stack>
                    <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} variant="middle" />
                    <Stack direction={"column"} flexBasis={"50%"} spacing={3} pl={4} justifyContent={"space-between"}>
                        {currentPage == CurrentPage.First && <>
                            <Box>
                                <Stack spacing={3}>
                                    <Typography variant="h6">Контакты</Typography>
                                    <TextField label={"Имя"} onChange={(event) => {
                                        setAnimal((prevState) => {
                                            prevState.contacts.name = event.target.value;
                                            return ({ ...prevState })
                                        })
                                    }} required
                                        value={animal.contacts.name} autoFocus={true} />

                                    <MuiTelInputStyled inputProps={{ maxLength: 13 }}
                                        forceCallingCode defaultCountry="RU" disableDropdown label={"Телефон"} onChange={(newValue) => {
                                            setAnimal((prevState) => {
                                                prevState.contacts.phone = newValue;
                                                return ({ ...prevState })
                                            })
                                        }} required
                                        value={animal.contacts.phone} />

                                    <TextField
                                        label="Почта"
                                        onChange={(event) => {
                                            setAnimal((prevState) => {
                                                prevState.contacts.email = event.target.value;
                                                const regexp = new RegExp('[\w\d]*@[\w]*.[\w]*')
                                                setValidMail(regexp.test(event.target.value));
                                                return ({ ...prevState })
                                            })
                                        }}
                                        error={!validMail && Boolean(animal.contacts.email)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailRoundedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        inputProps={{
                                            inputMode: 'text',
                                            pattern: "[\w\d]*@[\w]*.[\w]*"
                                        }}
                                        variant="outlined"
                                    />

                                    <TextField
                                        label="Telegram"
                                        onChange={(event) => {
                                            setAnimal((prevState) => {
                                                prevState.contacts.telegram = event.target.value;
                                                return ({ ...prevState })
                                            })
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <TelegramIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                    />

                                    <TextField
                                        label="VK"
                                        onChange={(event) => {
                                            setAnimal((prevState) => {
                                                prevState.contacts.vk = event.target.value;
                                                return ({ ...prevState })
                                            })
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <TagRoundedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                    />
                                </Stack>
                            </Box>
                        </>}

                        {currentPage == CurrentPage.Second && <>
                            <Stack spacing={3}>
                                {selectedFiles.length > 0 && <ImageFileCarousel files={selectedFiles} />}
                                <Typography variant="h6">Загрузите фотографии питомца</Typography>
                                <Dropzone
                                    accept={{ 'image/png': [".png", ".jpg", ".jpeg", ".webp", ".bmp"] }}
                                    disabled={false}
                                    onDrop={acceptedFiles => onFileDrop(acceptedFiles)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Card variant={"outlined"} sx={{ ...RoundedStyle }}>
                                                    <Stack alignItems="center" justifyContent="center"
                                                        spacing={2}
                                                        sx={{
                                                            px: 4,
                                                            py: 4,
                                                        }}>
                                                        <DriveFolderUploadRoundedIcon sx={{
                                                            width: '42px',
                                                            height: '42px',
                                                        }} />
                                                        <Typography variant={"body1"} textAlign={"center"}>
                                                            Перетащите сюда фотографии или нажмите для
                                                            выбора</Typography>

                                                        <Button variant={"outlined"}>Выбрать фотографии</Button>
                                                    </Stack>
                                                </Card>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                                <AttachmentsCard selectedFiles={selectedFiles} onDelete={file => onDelete(file)} isDeletable={true} />

                            </Stack>

                            <Button variant={"contained"}
                                sx={{
                                    alignSelf: "flex-end",
                                    justifySelf: "flex-end",
                                }}
                                disabled={!animal.animalType
                                    || !animal.description
                                    || !animal.addressFull
                                    || selectedFiles.length == 0}
                                onClick={async () => await onSubmit()}
                                type="submit">
                                Создать
                            </Button>
                        </>}

                    </Stack>
                </Stack>

                {currentPage == CurrentPage.First && <Button variant={"contained"}
                    disabled={!animal.contacts.name || !animal.contacts.phone}
                    sx={{
                        alignSelf: "center",
                        width: "40%"
                    }}
                    size={"large"}
                    onClick={() => setCurrentPage(CurrentPage.Second)}
                    type="submit">
                    Далее
                </Button>}
            </Stack>
        </Card>
    </>
}
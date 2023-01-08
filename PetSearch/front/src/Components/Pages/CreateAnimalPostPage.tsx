import { Typography, TextField, Box, Button, Stack, IconButton, Card, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, ToggleButtonGroup, ToggleButton } from "@mui/material"
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { RoundedStyle } from "../../Styles/SxStyles";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useSaveLostAnimalMutation } from "../../QueryFetches/ApiHooks";
import Dropzone from "react-dropzone";
import { AttachmentsCard } from "../Common/AttachmentCard";
import { CreateLostAnimalEntityDto } from "../../Models/CreateLostAnimalEntity";
import { ImageFileCarousel } from "../Carousel/Carousel";
import React from "react";
import { Gender } from "../../Models/Gender";
import { GeocodeSearch } from "../Map/GeocodeSearch";

enum CurrentPage {
    First,
    Second,
    Third
}

enum PostType {
    Lost,
    Found
}

export const CreateAnimalPostPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<CurrentPage>(CurrentPage.First);
    const [postType, setPostType] = useState<PostType>(PostType.Found)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [date, setDate] = useState<Date>(new Date());
    const [other, setOther] = useState<Boolean>(false);
    const [lostAnimalEntity, setLostAnimalEntity] = useState<CreateLostAnimalEntityDto>({
        animalName: "",
        animalType: "Собака",
        lostAddressFull: "",
        lostAddressCity: "",
        lostGeoPosition: "",
        lostDate: "",
        description: "",
        age: 0,
        gender: Gender.Male,
        files: []
    })

    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLostAnimalEntity({ ...lostAnimalEntity, [prop]: event.target.value });
    };

    const onFileDrop = (acceptedFiles: File[]) => {
        const uniqueFiles = selectedFiles.concat(acceptedFiles).filter((f1, pos, arr) =>
            arr.findIndex((f2) => f2.name === f1.name) === pos)
        setSelectedFiles(uniqueFiles)
    }

    const onDelete = (selectedFile: File) => {
        setSelectedFiles(selectedFiles.filter((file) => selectedFile !== file))
    }

    const { enqueueSnackbar } = useSnackbar();

    const saveMutation = useSaveLostAnimalMutation(() => enqueueSnackbar("Объявление создано!", { variant: "success" }))
    const onSubmit = async () => {
        lostAnimalEntity.lostDate = date.toISOString()
        lostAnimalEntity.files = selectedFiles
        await saveMutation.mutateAsync(lostAnimalEntity)
    }

    return <>
        <Typography variant="h4" sx={{ ml: 3 }}>Создать объявление</Typography>
        <Card sx={{ m: 3, p: 3 }}>
            <Stack spacing={2}>
                <Stack direction={"row"}>
                    <Stack direction={"column"} flexBasis={"50%"} spacing={3} pr={2}>
                        {currentPage == CurrentPage.First && <>
                            <Typography variant="h6">Выберите тип объявления</Typography>
                            <ToggleButtonGroup fullWidth sx={{ justifyContent: "center" }} color="primary" size="large" value={postType} exclusive={true} onChange={(event, value) => setPostType(value)}>
                                <ToggleButton value={PostType.Found} key={PostType.Found}>
                                    Я нашел питомца
                                </ToggleButton>
                                <ToggleButton value={PostType.Lost} key={PostType.Lost}>
                                    Я потерял питомца
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
                                            value={lostAnimalEntity.gender}
                                            name="radio-buttons-group"
                                            onChange={handleChange("gender")}
                                        >
                                            <FormControlLabel control={<Radio />} label={"Мужской"} value={Gender.Male} />
                                            <FormControlLabel control={<Radio />} label={"Женский"} value={Gender.Female} />
                                        </RadioGroup>
                                    </FormControl>
                                </Card>
                                <TextField
                                    id="outlined-number"
                                    label="Возраст"
                                    type="number"
                                    InputProps={{ inputProps: { min: "0", max: "25", step: "1" } }}
                                    onChange={handleChange("age")}
                                    value={lostAnimalEntity.age}
                                />
                            </Stack>

                            <Button variant={"contained"}
                                onClick={() => setCurrentPage(CurrentPage.Second)}
                                type="submit">
                                Далее
                            </Button>
                        </>}

                        {currentPage == CurrentPage.Second && <>
                            <Typography variant="h6">Дополнительная информация о питомце</Typography>
                            {postType == PostType.Found &&<TextField label={"Кличка питомца"} onChange={handleChange("animalName")} autoFocus={true} />}
                            <TextField
                                multiline
                                rows={5}
                                label={"Дополнительная информация"}
                                onChange={handleChange("description")} />

                            <Typography variant="h6">Место и дата {postType == PostType.Found ? "пропажи" : "находки"}</Typography>
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


                            <GeocodeSearch lostAnimalEntity={lostAnimalEntity}
                                handleChange={(prop: string, value: string | undefined) => {
                                    setLostAnimalEntity(previousState => ({ ...previousState, [prop]: value }))
                                }
                                } />

                            <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
                                <Button variant={"outlined"} onClick={() => setCurrentPage(CurrentPage.First)}>Назад</Button>

                                <Button variant={"contained"}
                                    disabled={!lostAnimalEntity.animalName
                                        || !lostAnimalEntity.animalType
                                        || !lostAnimalEntity.description
                                        || !lostAnimalEntity.lostAddressFull
                                        || selectedFiles.length == 0}
                                    onClick={async () => await onSubmit()}
                                    type="submit">
                                    Создать
                                </Button>
                            </Stack>
                        </>}
                    </Stack>
                    <Stack direction={"column"} flexBasis={"50%"} spacing={3} pl={2}>
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

                                                <Button disabled={false} variant={"outlined"}>Выбрать фотографии</Button>
                                            </Stack>
                                        </Card>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        <AttachmentsCard selectedFiles={selectedFiles} onDelete={file => onDelete(file)} isDeletable={true} />
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    </>
}
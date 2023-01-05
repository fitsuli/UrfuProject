import { Fab, Modal, Typography, TextField, Box, Button, Stack, IconButton, Card, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from "@mui/material"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { FullScreenStyle, ModalStyle, RoundedStyle } from "../../Styles/SxStyles";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useSaveLostAnimalMutation } from "../../QueryFetches/ApiHooks";
import Dropzone from "react-dropzone";
import { AttachmentsCard } from "../Common/AttachmentCard";
import { CreateLostAnimalEntityDto } from "../../Models/CreateLostAnimalEntity";
import { ImageFileCarousel } from "../Carousel/Carousel";
import React from "react";
import { Gender } from "../../Models/Gender";

export const AddLostAnimalButton: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [date, setDate] = useState<Date>(
        new Date()
    );
    const [lostAnimalEntity, setLostAnimalEntity] = useState<CreateLostAnimalEntityDto>({
        animalName: "",
        animalType: "",
        lostArea: "",
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
        refreshModal()
    }

    const refreshModal = () => {
        setModalVisible(false)
        setSelectedFiles([])
        setDate(new Date())
        setLostAnimalEntity({
            animalName: "",
            animalType: "",
            lostArea: "",
            lostDate: "",
            description: "",
            gender: Gender.Male,
            age: 0,
            files: []
        })
    }

    return <>
        <Fab color="primary" variant="extended" sx={{ position: "fixed", bottom: 24, right: 24 }} onClick={() => setModalVisible(true)}>
            <AddRoundedIcon sx={{ mr: 1 }} />
            Создать объявление
        </Fab>

        <Modal
            disableAutoFocus
            open={modalVisible}
            onClose={() => refreshModal()}>
            <Box sx={[ModalStyle, FullScreenStyle]}>
                <Stack spacing={2}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Создание объявления
                        </Typography>

                        <IconButton onClick={() => refreshModal()}>
                            <CloseRoundedIcon sx={{
                                width: 36,
                                height: 36
                            }} />
                        </IconButton>
                    </Stack>

                    <Stack direction={"row"}>
                        <Stack direction={"column"} flexBasis={"50%"} spacing={3} pr={2}>
                            <TextField
                                label={"Кличка питомца"}
                                onChange={handleChange("animalName")}
                                autoFocus={true} />

                            <TextField
                                label={"Тип и порода питомца"}
                                onChange={handleChange("animalType")} />

                            <TextField
                                multiline
                                rows={5}
                                label={"Подробная информация"}
                                onChange={handleChange("description")} />

                            <Stack direction={"row"} spacing={2}>
                                <DateTimePicker
                                    label={"Когда потеряли"}
                                    renderInput={(params) => <TextField {...params} />}
                                    value={date}
                                    inputFormat="dd.MM.yyyy HH:mm"
                                    onChange={(newValue) => {
                                        newValue && setDate(newValue);
                                    }}
                                />
                                <TextField
                                    label={"Где потеряли"}
                                    onChange={handleChange("lostArea")}
                                    sx={{
                                        flexGrow: 1
                                    }} />
                            </Stack>

                            <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                <Card variant={"outlined"} elevation={0} sx={{ boxShadow: 0, borderRadius: 1}}>
                                    <FormControl sx={{ padding: 2 }}>
                                        <FormLabel id="radio-buttons-group-label">Пол животного</FormLabel>
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
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ inputProps: { min: "0", max: "25", step: "1" } }}
                                    onChange={handleChange("age")}
                                    value={0}
                                    sx={{ flexGrow: 1 }}
                                />
                            </Stack>

                            <Button variant={"contained"}
                                disabled={!lostAnimalEntity.animalName
                                    || !lostAnimalEntity.animalType
                                    || !lostAnimalEntity.description
                                    || !lostAnimalEntity.lostArea
                                    || selectedFiles.length == 0}
                                onClick={async () => await onSubmit()}
                                type="submit">
                                Создать
                            </Button>
                        </Stack>
                        <Stack direction={"column"} flexBasis={"50%"} spacing={3} pl={2}>
                            {selectedFiles.length > 0 && <ImageFileCarousel files={selectedFiles} />}
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
                                                        Перетащите сюда файлы или нажмите для
                                                        выбора</Typography>

                                                    <Button disabled={false} variant={"outlined"}>Выбрать файлы</Button>
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
            </Box>
        </Modal>
    </>
}
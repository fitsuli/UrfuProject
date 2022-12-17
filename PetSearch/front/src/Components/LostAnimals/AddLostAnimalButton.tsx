import { Fab, Modal, Typography, TextField, Box, Button, Stack, IconButton } from "@mui/material"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from "react";
import { useSnackbar } from "notistack";
import { FullScreenStyle, ModalStyle } from "../../Styles/SxStyles";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LostAnimalEntity } from "../../Models/LostAnimalEntity";
import { useSaveLostAnimalMutation } from "../../QueryFetches/ApiHooks";

export const AddLostAnimalButton: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [date, setDate] = useState<Date>(
        new Date()
    );
    const [lostAnimalEntity, setLostAnimalEntity] = useState<LostAnimalEntity>({
        animalName: "",
        animalType: "",
        lostArea: "",
        lostDate: "",
        description: "",
    })

    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLostAnimalEntity({ ...lostAnimalEntity, [prop]: event.target.value });
    };

    const { enqueueSnackbar } = useSnackbar();

    const saveMutation = useSaveLostAnimalMutation(() => enqueueSnackbar("Объявление создано!", { variant: "success" }))
    const onSubmit = async () => {
        lostAnimalEntity.lostDate = date.toISOString()
        await saveMutation.mutateAsync(lostAnimalEntity)
        setModalVisible(false)
    }

    return <>
        <Fab color="primary" variant="extended" sx={{ position: "fixed", bottom: 24, right: 24 }} onClick={() => setModalVisible(true)}>
            <AddRoundedIcon sx={{ mr: 1 }} />
            Создать объявление
        </Fab>

        <Modal
            disableAutoFocus
            open={modalVisible}
            onClose={() => setModalVisible(false)}>
            <Box sx={[ModalStyle, FullScreenStyle]}>
                <Stack spacing={2}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Создание объявления
                        </Typography>

                        <IconButton onClick={() => setModalVisible(false)}>
                            <CloseRoundedIcon sx={{
                                width: 36,
                                height: 36
                            }} />
                        </IconButton>
                    </Stack>

                    <Stack direction={"row"} spacing={4}>
                        <Stack direction={"column"} flexBasis={"50%"} spacing={3}>
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
                                label={"Описание"}
                                onChange={handleChange("description")} />

                            <Stack direction={"row"} spacing={2}>
                                <DateTimePicker
                                    label={"Когда потеряли"}
                                    renderInput={(params) => <TextField {...params} />}
                                    value={date}
                                    inputFormat="dd.MM.yyyy HH:mm"
                                    onChange={(newValue) => {
                                        setDate(newValue);
                                    }}
                                />
                                <TextField
                                    label={"Где потеряли"}
                                    onChange={handleChange("lostArea")}
                                    sx={{
                                        flexGrow: 1
                                    }} />

                            </Stack>

                            <Button variant={"contained"}
                                disabled={!lostAnimalEntity.animalName || !lostAnimalEntity.animalType || !lostAnimalEntity.description}
                                onClick={async () => await onSubmit()}
                                type="submit">
                                Создать
                            </Button>
                        </Stack>
                        <Stack direction={"column"}>
                            asdasd
                        </Stack>
                    </Stack>

                </Stack>
            </Box>
        </Modal>
    </>
}
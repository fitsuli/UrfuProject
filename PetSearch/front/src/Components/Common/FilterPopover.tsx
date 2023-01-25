import React from 'react';
import { useState } from 'react';
import { Divider, Popover, Typography, IconButton, Stack, ToggleButtonGroup, ToggleButton, Button } from '@mui/material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import { AnimalVariant } from "../../Models/AnimalVariant";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { AnimalFilterType } from '../../Models/AnimalFilterType';


export const FilterPopover: React.FC<{
    onFilter: (animalVariant: AnimalVariant, animalFilterType: AnimalFilterType | null) => void
}> = ({ onFilter }) => {
    const [open, setOpen] = useState(null);

    const handleOpen = (event : any) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const [animalVariant, setAnimalVariant] = useState(AnimalVariant.Lost);
    const [animalFilter, setAnimalFilter] = useState<AnimalFilterType | null>(null);

    return <>
        <IconButton
            onClick={handleOpen}
            size="large"
            sx={{
                p: 0,
                ...{
                    '&:before': {
                        zIndex: 1,
                        content: "''",
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        position: 'absolute',
                    },
                },
            }}
        >
            <FilterListRoundedIcon fontSize='large' />
        </IconButton>

        <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            PaperProps={{
                sx: {
                    p: 0,
                    mt: 1.5,
                    width: 350,
                    '& .MuiMenuItem-root': {
                        typography: 'body2',
                        borderRadius: 0.75,
                    },
                },
            }}
        >

            <Stack sx={{ my: 2.5, px: 2.5 }} spacing={2}>
                <Typography variant="subtitle1" noWrap>Статус питомца</Typography>
                <Stack direction="row" spacing={1}>
                    <ToggleButtonGroup fullWidth sx={{ justifyContent: "center" }} color="primary" size="large" value={animalVariant} exclusive={true}
                        onChange={(event, value) => {
                            if (value !== null) {
                                setAnimalVariant(value)
                            }
                        }}>
                        <ToggleButton value={AnimalVariant.Lost} key={AnimalVariant.Lost}>
                            Потерянные
                        </ToggleButton>
                        <ToggleButton value={AnimalVariant.Found} key={AnimalVariant.Found}>
                            Найденные
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Typography variant="subtitle1" noWrap>Вид питомца</Typography>
                <Stack direction="row" spacing={1}>
                    <ToggleButtonGroup fullWidth sx={{ justifyContent: "center" }} color="primary" size="large" value={animalFilter} exclusive={true}
                        onChange={(event, value) => {setAnimalFilter(value)}}>
                        <ToggleButton value={AnimalFilterType.Cat} key={AnimalFilterType.Cat}>
                            Кошки
                        </ToggleButton>
                        <ToggleButton value={AnimalFilterType.Dog} key={AnimalFilterType.Dog}>
                            Собаки
                        </ToggleButton>
                        <ToggleButton value={AnimalFilterType.Other} key={AnimalFilterType.Other}>
                            Другие
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <div style={{ display: "flex", justifyContent: "end" }}>
                <Button startIcon={<CheckRoundedIcon />}
                    variant="contained" onClick={() => {
                        handleClose()
                        onFilter(animalVariant, animalFilter)
                    }} sx={{ m: 2 }}>
                    Применить
                </Button>
            </div>
        </Popover>
    </>
}
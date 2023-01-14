import React, { useMemo } from "react"
import { Box, Card, CardHeader, Chip, Stack, Typography, useTheme } from '@mui/material';
import { Animal } from "../../Models/Animal";
import { format } from 'date-fns-tz'
import { parseISO } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { AnimalVariant } from "../../Models/AnimalVariant";

export const AnimalCard: React.FC<{
    animal: Animal
    variant: AnimalVariant
}> = ({ animal, variant }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()
    const lostDate = useMemo(() => parseISO(animal.date), [animal])
    const utcDate = useMemo(() => format(lostDate, 'dd.MM.yyyy'), [lostDate])

    return <>
        <Card onClick={() => navigate(`${location.pathname}/${animal.id}`)} sx={{
            position: "relative",
        }}>
            <Box sx={{
                height: "300px",
                backgroundImage: animal.fileNames?.length ? `url(/AnimalsImages/${animal.fileNames[0]})` : "url(https://www.freeiconspng.com/thumbs/animal-icon-png/animal-paw-vector-icon-animals-icons-icons-download-0.png)",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                opacity: animal.isClosed ? "0.5" : "1"
            }}>
            </Box>
            <Box>
                {animal.isClosed && <Chip sx={{
                    m: 2,
                    position: "absolute",
                    right: 0,
                    top: 0,
                }} color={"primary"} label={variant == AnimalVariant.Lost ? "Питомец найден" : "Хозяин найден"} icon={<CheckCircleOutlineRoundedIcon />} />
                }
            </Box>
            <Stack direction={"row"} justifyContent={"space-between"} sx={{
                opacity: animal.isClosed ? "0.5" : "1"
            }}>
                {variant == AnimalVariant.Lost ? <Stack p={3}>
                    <Typography variant={"h6"} gutterBottom>{animal.animalName}</Typography>
                    <Typography color={theme.palette.grey[600]} variant={"body2"}>{animal.animalType}</Typography>
                    <Typography color={theme.palette.grey[600]} variant={"body2"}>{animal.addressCity ? animal.addressCity : animal.addressFull}</Typography>
                </Stack> :
                    <CardHeader title={animal.animalType} subheader={animal.addressCity ? animal.addressCity : animal.addressFull}></CardHeader>
                }

                <CardHeader subheader={utcDate} />
            </Stack>
        </Card>
    </>
}
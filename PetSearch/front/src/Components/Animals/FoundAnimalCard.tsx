import React, { useMemo } from "react"
import { Box, Card, CardHeader, Stack, Typography, useTheme } from '@mui/material';
import { Animal } from "../../Models/Animal";
import { format } from 'date-fns-tz'
import { parseISO } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";

export const FoundAnimalCard: React.FC<{
    animal: Animal
}> = ({ animal }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const lostDate = useMemo(() => parseISO(animal.date), [animal])
    const utcDate = useMemo(() => format(lostDate, 'dd.MM.yyyy'), [lostDate])

    return <>
        <Card onClick={() => navigate(`${location.pathname}/${animal.id}`)}>
            <Box sx={{
                height: "300px",
                backgroundImage: animal.fileNames?.length ? `url(/AnimalsImages/${animal.fileNames[0]})` : "url(https://www.freeiconspng.com/thumbs/animal-icon-png/animal-paw-vector-icon-animals-icons-icons-download-0.png)",
                backgroundPosition: "center center",
                backgroundSize: "cover"
            }} />
            <Stack direction={"row"} justifyContent={"space-between"}>
                <CardHeader title={animal.animalType} subheader={animal.addressCity ? animal.addressCity : animal.addressFull}></CardHeader>
                <CardHeader subheader={utcDate} />
            </Stack>
        </Card>
    </>
}
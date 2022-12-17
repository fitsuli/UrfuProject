import React, { useMemo } from "react"
import { Box, Card, CardHeader, Stack } from '@mui/material';
import { LostAnimalEntity } from "../../Models/LostAnimalEntity";
import { format } from 'date-fns-tz'
import { parseISO } from "date-fns";

export const LostAnimalCard: React.FC<{
    animal: LostAnimalEntity
}> = ({ animal }) => {
    const lostDate = useMemo(() => parseISO(animal.lostDate), [animal])
    const utcDate = useMemo(() => format(lostDate, 'dd.MM.yyyy'), [lostDate])

    return <>
        <Card>
            <Box sx={{
                height: "300px",
                backgroundImage: "url(https://pic.rutubelist.ru/user/65/0c/650c6116e859d34154a1629f05e7c435.jpg)",
                backgroundPosition: "center center",
                backgroundSize: "cover"
            }} />
            <Stack direction={"row"} justifyContent={"space-between"}>
                <CardHeader title={animal.animalName} subheader={animal.animalType} />
                <CardHeader subheader={utcDate} />
            </Stack>
        </Card>
    </>
}
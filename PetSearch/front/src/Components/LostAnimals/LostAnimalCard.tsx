import React from "react"
import { Box, Card, CardHeader, Stack } from '@mui/material';
import { LostAnimalEntity } from "../../Models/LostAnimalEntity";

export const LostAnimalCard: React.FC<{
    animal: LostAnimalEntity
}> = ({ animal }) => {
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
                <CardHeader subheader={animal.lostDate} />
            </Stack>
        </Card>
    </>
}
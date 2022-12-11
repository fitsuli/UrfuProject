import React from "react"
import { Card, CardHeader} from '@mui/material';
import { LostAnimalEntity } from "../../Models/LostAnimalEntity";

export const LostAnimalCard : React.FC<{
    animal: LostAnimalEntity
}> = ({animal}) => {
    return <>
        <Card>
            <CardHeader title={animal.animalName}/>
        </Card>
    </>
}
import axios, { AxiosError } from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { LostAnimalEntity } from "../Models/LostAnimalEntity"
import delay from "delay"
import { CreateLostAnimalEntityDto } from "../Models/CreateLostAnimalEntity"

export const useLostAnimalsQuery = () => {
    return useQuery<LostAnimalEntity[], AxiosError>('lostAnimals', async () => {
        await delay(500);
        const result = await axios.get('lostAnimals');
        return result.data;
    })
}

export const useSaveLostAnimalMutation = (onSuccess: () => void) => {
    const queryClient = useQueryClient()

    return useMutation<LostAnimalEntity, AxiosError, CreateLostAnimalEntityDto>(async (lostAnimal) => {
        let formData = new FormData();
        formData.append("AnimalName", lostAnimal.animalName)
        formData.append("AnimalType", lostAnimal.animalType)
        formData.append("Description", lostAnimal.description)
        formData.append("LostDate", lostAnimal.lostDate)
        formData.append("LostArea", lostAnimal.lostArea)
        lostAnimal.files.forEach(file => formData.append("Images", file))

        const res = await axios.post('lostAnimals', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    }, {
        onSuccess(data) {
            queryClient.setQueryData<LostAnimalEntity[]>("lostAnimals", lostAnimals => {
                lostAnimals.push(data)
                return [...lostAnimals]
            })
            if (onSuccess) onSuccess()
        }
    })
}
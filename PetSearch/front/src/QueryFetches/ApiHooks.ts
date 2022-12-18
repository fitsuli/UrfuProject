import axios, { AxiosError } from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { LostAnimalEntity } from "../Models/LostAnimalEntity"
import delay from "delay"

export const useLostAnimalsQuery = () =>{
    return useQuery<LostAnimalEntity[], AxiosError>('lostAnimals', async () => {
        await delay(500);
        const result = await axios.get('lostAnimals');
        return result.data;
    })
}

export const useSaveLostAnimalMutation = (onSuccess: () => void) =>{
    const queryClient = useQueryClient()

    return useMutation<LostAnimalEntity, AxiosError, LostAnimalEntity>(async (animal) => {
        const res = await axios.post('lostAnimals', animal)
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
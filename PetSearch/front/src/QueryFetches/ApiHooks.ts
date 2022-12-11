import axios, { AxiosError } from "axios"
import { useQuery } from "react-query"
import { LostAnimalEntity } from "../Models/LostAnimalEntity"
import delay from "delay"

export const useLostAnimalsQuery = () =>{
    return useQuery<LostAnimalEntity[], AxiosError>('lostAnimals', async () => {
        await delay(500);
        const result = await axios.get('lostAnimal');
        return result.data;
    })
}
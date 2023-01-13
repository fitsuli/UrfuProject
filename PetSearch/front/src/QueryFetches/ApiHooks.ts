import axios, { AxiosError } from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Animal } from "../Models/Animal"
import delay from "delay"
import { CreateAnimalDto } from "../Models/CreateAnimalDto"
import { serialize } from 'object-to-formdata';
import { AnimalVariant } from "../Models/AnimalVariant"

export const useAnimalsQuery = (variant : AnimalVariant) => {
    const queryName = GetQueryName(variant);

    return useQuery<Animal[], AxiosError>(queryName, async () => {
        await delay(500);
        const result = await axios.get(queryName);
        return result.data;
    }, { retry: false })
}

export const useAnimalQuery = (variant : AnimalVariant, animalId: string) => {
    const queryName = GetQueryName(variant);

    return useQuery<Animal, AxiosError>([queryName, {animalId: animalId}], async () => {
        await delay(500);
        const result = await axios.get(`${queryName}/${animalId}`)
        return result.data;
    }, {retry: false})
}

export const useSaveAnimalMutation = (variant : AnimalVariant, onSuccess: () => void) => {
    const queryClient = useQueryClient()
    const queryName = GetQueryName(variant);
    
    return useMutation<Animal, AxiosError, CreateAnimalDto>(async (animal) => {
        let formData = serialize(animal);
        formData.delete("Images");
        animal.files.forEach(file => formData.append("Images", file))

        const res = await axios.post(queryName, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    }, {
        onSuccess(data) {
            queryClient.setQueryData<Animal[]>(queryName, animals => {
                animals && animals.push(data)
                return animals ? [...animals] : []
            })
            if (onSuccess) onSuccess()
        }
    }, )
}

export const useDeleteAnimalMutation = (variant : AnimalVariant, onSuccess: () => void) => {
    const queryClient = useQueryClient()
    const queryName = GetQueryName(variant);
    
    return useMutation<Animal, AxiosError, Animal>(async (animal) => {
        const res = await axios.delete(`${queryName}/${animal.id}`)

        return res.data
    }, {
        onSuccess(data) {
            queryClient.setQueryData<Animal[]>(queryName, animals => {
                if (animals){
                    const index = animals.indexOf(data);
                    const result = animals.slice(index, 1)
                    return result ? [...result] : []
                }
                return animals ? [...animals] : []
            })
            if (onSuccess) onSuccess()
        }
    }, )
}

const GetQueryName = (variant: AnimalVariant) => variant == AnimalVariant.Lost ? "lostAnimals" : "foundAnimals"
import axios, { AxiosError } from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Animal } from "../Models/Animal"
import delay from "delay"
import { CreateAnimalDto } from "../Models/CreateAnimalDto"
import { serialize } from 'object-to-formdata';
import { AnimalVariant } from "../Models/AnimalVariant"
import { GetAnimalsCollectionName } from "../Components/Common/QueryBuilder"

export const useAnimalsQuery = (variant : AnimalVariant, query: string) => {
    const animalsCollection = GetAnimalsCollectionName(variant);

    return useQuery<Animal[], AxiosError>([animalsCollection, {query: query}], async () => {
        const result = await axios.get(animalsCollection + query);
        return result.data;
    }, { retry: false})
}

export const useAnimalQuery = (variant : AnimalVariant, animalId: string) => {
    const animalsCollection = GetAnimalsCollectionName(variant);

    return useQuery<Animal, AxiosError>([animalsCollection, {animalId: animalId}], async () => {
        await delay(500);
        const result = await axios.get(`${animalsCollection}/${animalId}`)
        return result.data;
    }, {retry: false})
}

export const useSaveAnimalMutation = (variant : AnimalVariant, onSuccess: () => void) => {
    const queryClient = useQueryClient()
    const animalsCollection = GetAnimalsCollectionName(variant);
    
    return useMutation<Animal, AxiosError, CreateAnimalDto>(async (animal) => {
        let formData = serialize(animal);
        formData.delete("Images");
        animal.files.forEach(file => formData.append("Images", file))

        const res = await axios.post(animalsCollection, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        return res.data
    }, {
        onSuccess(data) {
            queryClient.setQueryData<Animal[]>([animalsCollection], animals => {
                animals && animals.push(data)
                return animals ? [...animals] : []
            })
            if (onSuccess) onSuccess()
        }
    }, )
}

export const useDeleteAnimalMutation = (variant : AnimalVariant, onSuccess: () => void) => {
    const queryClient = useQueryClient()
    const animalsCollection = GetAnimalsCollectionName(variant);
    
    return useMutation<Animal, AxiosError, Animal>(async (animal) => {
        const res = await axios.delete(`${animalsCollection}/${animal.id}`)

        return res.data
    }, {
        onSuccess(data) {
            queryClient.setQueryData<Animal[]>([animalsCollection], animals => {
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

export const useClosePostMutation = (variant : AnimalVariant, onSuccess: () => void) => {
    const queryClient = useQueryClient()
    const animalsCollection = GetAnimalsCollectionName(variant);
    
    return useMutation<Animal, AxiosError, Animal>(async (animal) => {
        const res = await axios.post(`${animalsCollection}/close/${animal.id}`)

        return res.data
    }, {
        onSuccess(data) {
            queryClient.setQueryData<Animal[]>([animalsCollection], animals => {
                if (animals){
                    const index = animals.findIndex(obj => obj.id == data.id);
                    const animal = animals[index];
                    animal.isClosed = true;
                    return animals ? [...animals] : []
                }
                return animals ? [...animals] : []
            })
            if (onSuccess) onSuccess()
        }
    }, )
}

export const useAnimalsCitiesQuery = (variant : AnimalVariant) => {
    const animalsCollection = GetAnimalsCollectionName(variant);

    return useQuery<string[], AxiosError>([animalsCollection, "cities"], async () => {
        const result = await axios.get(`${animalsCollection}/cities`);
        return result.data;
    }, { retry: false })
}
import { AnimalFilterType } from "../../Models/AnimalFilterType";
import { AnimalVariant } from "../../Models/AnimalVariant";

export const BuildQuery = (sortDesc: boolean, city: string | null, animalFilterType: AnimalFilterType | null) => {
    let query = sortDesc ? "?sortType=desc" : "?sortType=asc"

    if (city) {
        query += `&city=${city}`
    }

    if (animalFilterType != null) {
        const filter = GetAnimalsFilter(animalFilterType)
        query += `&animalType=${filter}`
    }

    return query;
}

export const GetAnimalsCollectionName = (variant: AnimalVariant) => variant == AnimalVariant.Lost ? "lostAnimals" : "foundAnimals"

export const GetAnimalsFilter = (animalFilterType: AnimalFilterType) => {
    switch (animalFilterType) {
        case AnimalFilterType.Cat:
            return "Кошка"
        case AnimalFilterType.Dog:
            return "Собака"
        case AnimalFilterType.Other:
            return "Другой"
    }
}
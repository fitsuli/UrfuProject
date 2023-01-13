import { Contacts } from "./Contacts";
import { Gender } from "./Gender";

export type CreateLostAnimalDto = {
    animalName: string;
    animalType: string;
    addressFull: string;
    addressCity: string;
    geoPosition: string;
    date: string;
    postCreationDate: string;
    description: string;
    gender: Gender;
    contacts: Contacts;
    age: number;
    files: File[];
    userId?: string;
    id?: string;
}
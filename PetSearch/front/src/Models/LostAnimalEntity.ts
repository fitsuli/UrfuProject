import { Contacts } from "./Contacts";
import { Gender } from "./Gender";

export type LostAnimalEntity = {
    animalName: string;
    animalType: string;
    addressFull: string;
    addressCity: string;
    geoPosition: string;
    date: string;
    description: string;
    gender: Gender;
    contacts: Contacts;
    age: number;
    fileNames: string[];
    userId?: string;
    id?: string;
}
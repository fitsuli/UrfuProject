import { Contacts } from "./Contacts";
import { Gender } from "./Gender";

export type Animal = {
    animalName: string | null;
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
    isClosed: boolean;
    userId?: string;
    id: string;
}
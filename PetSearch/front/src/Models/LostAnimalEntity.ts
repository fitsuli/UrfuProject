import { Gender } from "./Gender";

export type LostAnimalEntity = {
    animalName: string;
    animalType: string;
    lostAddressFull: string;
    lostAddressCity: string;
    lostGeoPosition: string;
    lostDate: string;
    description: string;
    gender: Gender;
    age: number;
    fileNames: string[];
    userId?: string;
    id?: string;
}
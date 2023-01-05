import { Gender } from "./Gender";

export type CreateLostAnimalEntityDto = {
    animalName: string;
    animalType: string;
    lostAddressFull: string;
    lostAddressCity: string;
    lostGeoPosition: string;
    lostDate: string;
    description: string;
    gender: Gender;
    age: number;
    files: File[];
    userId?: string;
    id?: string;
}
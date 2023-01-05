import { Gender } from "./Gender";

export type CreateLostAnimalEntityDto = {
    animalName: string;
    animalType: string;
    lostArea: string;
    lostDate: string;
    description: string;
    gender: Gender;
    age: number;
    files: File[];
    userId?: string;
    id?: string;
}
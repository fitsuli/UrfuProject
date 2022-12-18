export type CreateLostAnimalEntityDto = {
    animalName: string;
    animalType: string;
    lostArea: string;
    lostDate: string;
    description: string;
    files: File[];
    userId?: string;
    id?: string;
}
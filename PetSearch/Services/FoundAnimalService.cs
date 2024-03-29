﻿using PetSearch.Models;
using PetSearch.Repositories;
using PetSearch.Services.Providers.Abstractions;

namespace PetSearch.Services;

public class FoundAnimalService : AnimalServiceBase<FoundAnimal>
{
    public FoundAnimalService(IRepository<FoundAnimal> repository, IFileProvider fileProvider) 
        : base(repository, fileProvider)
    {
    }
}
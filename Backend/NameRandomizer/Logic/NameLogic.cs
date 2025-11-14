using System;
using System.Collections.Generic;
using System.Linq;
using Data;
using Entites;
using Entites.Models;

namespace Logic;

public class NameLogic
{
    private Repository repo;

    public NameLogic(Repository repo)
    {
        this.repo = repo;
    }

    public void Create(NameCreateDto dto)
    {
        var nameToAdd = new NameModel(dto.Name);
        repo.Create(nameToAdd);
    }

    public IEnumerable<NameModel> GetAll()
    {
        return repo.GetAll();
    }

    public void Delete(string id)
    {
        repo.DeleteById(id);
    }

    public NameModel GetRandomName()
    {
        var names = repo.GetAll();
        Random  random = new Random();
        return names.ElementAt(random.Next(0, names.Count()));
    }
}
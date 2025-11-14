using System;

namespace Entites.Models;

public class NameModel
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } =  string.Empty;

    public NameModel(string name)
    {
        this.Id = Guid.NewGuid().ToString();
        this.Name = name;
    }
}
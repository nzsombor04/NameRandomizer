using Entites.Models;
using Logic;
using Microsoft.AspNetCore.Mvc;

namespace NameRandomizer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NameController : ControllerBase
{
    private NameLogic logic;

    public NameController(NameLogic logic)
    {
        this.logic = logic;
    }

    [HttpPost]
    public void Create([FromBody] string name)
    {
        logic.Create(name);
    }

    [HttpGet]
    public IEnumerable<NameModel> GetAllNames()
    {
        return logic.GetAll();
    }

    [HttpGet("random")]
    public NameModel GetRandomName()
    {
        return logic.GetRandomName();
    }

    [HttpDelete]
    public void Delete(string id)
    {
        logic.Delete(id);
    }
}
using Entites.Models;

namespace Data;

public class Repository
{
    private NameContext ctx;
    
    public Repository(NameContext ctx)
    {
        this.ctx = ctx;
    }

    public void Create(NameModel model)
    {
        ctx.Set<NameModel>().Add(model);
        ctx.SaveChanges();
    }

    public NameModel GetById(string id)
    {
        return ctx.Set<NameModel>().First(n => n.Id == id);
    }

    public void DeleteById(string id)
    {
        var entity = GetById(id);
        ctx.Set<NameModel>().Remove(entity);
        ctx.SaveChanges();
    }

    public IQueryable<NameModel> GetAll()
    {
        return ctx.Set<NameModel>();
    }
}
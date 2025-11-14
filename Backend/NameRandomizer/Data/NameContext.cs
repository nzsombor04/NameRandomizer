using Entites.Models;
using Microsoft.EntityFrameworkCore;

namespace Data;

public class NameContext : DbContext
{
    public DbSet<NameModel> Names { get; set; }

    public NameContext(DbContextOptions<NameContext> options) : base(options)
    {
        
    }
}
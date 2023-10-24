using Eathere.Models;
using Microsoft.EntityFrameworkCore;

namespace Eathere.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { 

        }
        public DbSet<User> Users { get; set; } = null;
    }
}

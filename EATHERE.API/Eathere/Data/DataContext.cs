using Microsoft.EntityFrameworkCore;

namespace Eathere.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { 

        }
    }
}

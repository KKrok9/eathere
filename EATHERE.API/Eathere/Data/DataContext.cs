using Eathere.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Eathere.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { 

        }
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Restaurant> Restaurants { get; set; } = null!;
        public DbSet<Dish> Dishes{ get; set; } = null!;
        public DbSet<DishType> DishTypes { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<PortionType> PortionTypes { get; set; } = null!;
        public DbSet<Table> Tables { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Restaurant>()
                .HasIndex(r => r.RestaurantCode)
                .IsUnique();
            modelBuilder.Entity<Table>()
               .HasOne(t => t.Restaurant)
               .WithMany()  // Assuming there is no navigation property on Restaurant pointing back to Table
               .HasForeignKey(t => t.RestaurantId)
               .OnDelete(DeleteBehavior.Restrict);

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
            base.OnConfiguring(optionsBuilder);
        }


    }
}

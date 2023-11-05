using Eathere.Data;
using Microsoft.EntityFrameworkCore;

namespace Eathere.SqlRepository
{
    public class SqlRepository<T> : ISqlRepository<T> where T : class
    {
        private readonly DataContext _context;
        private readonly DbSet<T>  _dbSet;

        public SqlRepository(DataContext context) 
        {
            _context = context;
            _dbSet = context.Set<T>();
        }
        public async Task AddAsync(T entity)
        {
            _dbSet.Add(entity);
            await _context.SaveChangesAsync();

        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await GetByIdAsync(id);
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync(); 
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var entities = await _dbSet.ToListAsync();

            if (entities == null || !entities.Any())
            {
                // Możesz tutaj zwrócić odpowiednią wartość lub informację zwrotną
                return Enumerable.Empty<T>(); // Zwraca pustą listę
            }

            return entities;
        }


        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}

using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using PetSearch.Models;

namespace PetSearch.Repositories
{
    public class EFRepository<TEntity>: IRepository<TEntity> where TEntity : BaseEntity
    {
        public bool ReadOnly { get; }

        internal DbContext Context { get; }
        private DbSet<TEntity> items => Context.Set<TEntity>();
        internal virtual IQueryable<TEntity> Items => ReadOnly ? items.AsNoTracking() : items;

        public EFRepository(DbContext context)
        {
            Context = context;
        }

        public Task<TEntity?> FindAsync(Guid id, CancellationToken cancellationToken)
        {
            var keyProperty = Context.Model.FindEntityType(typeof(TEntity)).FindPrimaryKey().Properties[0];
            return Items.FirstOrDefaultAsync(e => EF.Property<Guid>(e, keyProperty.Name) == id, cancellationToken);
        }

        public Task<TEntity[]> ListAsync(Expression<Func<TEntity, bool>> expression, CancellationToken cancellationToken)
        {
            return Items.Where(expression).ToArrayAsync(cancellationToken);
        }

        public Task<TEntity> SingleAsync(Expression<Func<TEntity, bool>> expression, CancellationToken cancellationToken)
        {
            return Items.SingleAsync(expression, cancellationToken);
        }

        public Task<TEntity?> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> expression,
            CancellationToken cancellationToken)
        {
            return Items.SingleOrDefaultAsync(expression, cancellationToken);
        }

        public Task<TEntity> FirstAsync(Expression<Func<TEntity, bool>> expression, CancellationToken cancellationToken)
        {
            return Items.FirstAsync(expression, cancellationToken);
        }

        public Task<TEntity?> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> expression,
            CancellationToken cancellationToken)
        {
            return Items.FirstOrDefaultAsync(expression, cancellationToken);
        }

        public Task<int> CountAsync(Expression<Func<TEntity, bool>> expression, CancellationToken cancellationToken)
        {
            return Items.CountAsync(expression, cancellationToken);
        }

        public Task<TResult[]> Query<TResult>(Func<IQueryable<TEntity>, IQueryable<TResult>> query, CancellationToken cancellationToken)
        {
            return query(Items).ToArrayAsync(cancellationToken);
        }

        public async Task<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken)
        {
            var entry = await items.AddAsync(entity, cancellationToken);
            return entry.Entity;
        }

        public async Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken)
        {
            await items.AddRangeAsync(entities, cancellationToken);
        }

        public Task RemoveAsync(TEntity entity)
        {
            items.Remove(entity);
            return Task.CompletedTask;
        }

        public Task RemoveRangeAsync(IEnumerable<TEntity> entities)
        {
            items.RemoveRange(entities);
            return Task.CompletedTask;
        }

        public Task<bool> Any(Expression<Func<TEntity, bool>> expression)
        {
            return items.AnyAsync(expression);
        }

        public Task SaveChangesAsync()
        {
            if (ReadOnly)
                throw new InvalidOperationException();

            return Context.SaveChangesAsync();
        }
    }
}
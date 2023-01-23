using System.Linq.Expressions;
using PetSearch.Models;

namespace PetSearch.Repositories
{
    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        bool ReadOnly { get; }
        Task<TEntity?> FindAsync(Guid id, CancellationToken cancellationToken);
        Task<TEntity[]> ListAsync(Expression<Func<TEntity,bool>> expression, CancellationToken cancellationToken);
        Task<TSelectKey[]> ListAsync<TSelectKey>(Expression<Func<TEntity, bool>> expression,
            Expression<Func<TEntity, TSelectKey>> keySelector,
            CancellationToken cancellationToken);
        Task<TEntity[]> ListWithOrderAsync<TKey>(Expression<Func<TEntity, bool>> expression,
            Expression<Func<TEntity, TKey>> keySelector,
            bool sortDesc,
            int take,
            int skip,
            CancellationToken cancellationToken);
        Task<TEntity> SingleAsync(Expression<Func<TEntity,bool>> expression, CancellationToken cancellationToken);
        Task<TEntity?> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> expression,
            CancellationToken cancellationToken);
        Task<TEntity> FirstAsync(Expression<Func<TEntity,bool>> expression, CancellationToken cancellationToken);
        Task<TEntity?> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> expression,
            CancellationToken cancellationToken);
        Task<int> CountAsync(Expression<Func<TEntity,bool>> expression, CancellationToken cancellationToken);
        Task<TResult[]> Query<TResult>(Func<IQueryable<TEntity>, IQueryable<TResult>> query, CancellationToken cancellationToken);
        Task<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken);
        Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken);
        Task RemoveAsync(TEntity entity);
        Task RemoveRangeAsync(IEnumerable<TEntity> entities);
        Task<bool> Any(Expression<Func<TEntity, bool>> expression);
        Task SaveChangesAsync();
    }
}
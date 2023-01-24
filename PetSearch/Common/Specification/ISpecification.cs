using System.Linq.Expressions;
using PetSearch.Models;

namespace PetSearch.Common.Specification;

public interface ISpecification<TEntity> where TEntity : BaseEntity
{
    Expression<Func<TEntity, bool>> IsSatisfiedBy();
}
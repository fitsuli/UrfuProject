using System.Linq.Expressions;
using PetSearch.Models;

namespace PetSearch.Common;

public class Specification<TEntity> : ISpecification<TEntity> where TEntity : BaseEntity
{
    private readonly Expression<Func<TEntity, bool>> expression;

    public Specification(Expression<Func<TEntity, bool>> expression)
    {
        this.expression = expression;
    }

    public Expression<Func<TEntity, bool>> IsSatisfiedBy()
    {
        return expression;
    }

    public static ISpecification<TEntity> Empty()
    {
        return new Specification<TEntity>(x => true);
    }

    public static ISpecification<TEntity> Create(Expression<Func<TEntity, bool>> expression)
    {
        return new Specification<TEntity>(expression);
    }
}
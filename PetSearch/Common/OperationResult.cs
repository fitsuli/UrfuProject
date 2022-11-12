namespace PetSearch.Common
{
    public class OperationResult
    {
        public string? ErrorMessage { get; }
        public int? HttpStatusCode { get; }
        public bool IsSuccessful { get; }

        protected OperationResult(bool isSuccessful, string? errorMessage = null, int? httpStatusCode = null)
        {
            IsSuccessful = isSuccessful;
            ErrorMessage = errorMessage;
            HttpStatusCode = httpStatusCode;
        }

        public static OperationResult Success() => new(true);

        public static OperationResult Failure(string error, int? httpStatusCode = null) =>
            new(false, error, httpStatusCode);
    }

    public class OperationResult<T> : OperationResult
    {
        public T Result { get; }

        protected OperationResult(bool isSuccessful, T result, string? errorMessage = null, int? httpStatusCode = null)
            : base(isSuccessful, errorMessage, httpStatusCode)
        {
            Result = result;
        }

        public static OperationResult<T> Success(T result) => new(true, result);

        public static OperationResult<T> Failure(string error, int? httpStatusCode = null) =>
            new(false, default(T), error, httpStatusCode);
    }
}
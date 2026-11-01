export class AppError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const Errors = {
  notFound: (entity: string, id?: string) =>
    new AppError(404, "NOT_FOUND", id ? `${entity} ${id} not found` : `${entity} not found`),
  badRequest: (message: string, details?: unknown) =>
    new AppError(400, "BAD_REQUEST", message, details),
  unauthorized: (message = "Authentication required") => new AppError(401, "UNAUTHORIZED", message),
  forbidden: (message = "You do not have permission to do this") =>
    new AppError(403, "FORBIDDEN", message),
  conflict: (message: string, details?: unknown) => new AppError(409, "CONFLICT", message, details),
  unprocessable: (message: string, details?: unknown) =>
    new AppError(422, "UNPROCESSABLE", message, details)
};

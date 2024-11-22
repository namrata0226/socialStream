class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something Went Wrong",
    errors = [],
    statck = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;
    this.data = null;

    if (statck) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

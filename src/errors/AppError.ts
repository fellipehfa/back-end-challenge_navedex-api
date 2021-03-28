class AppError {
  public readonly statusCode: number
  public readonly message: string
  public readonly log: string

  constructor (statusCode: number, message: string, log: string) {
    this.statusCode = statusCode
    this.message = message
    this.log = log
  }
}

export { AppError }

class ResourceNotFoundError extends Error {
  constructor (...args) {
    super (...args) 
    Error.captureStackTrace(this, ResourceNotFoundError) // is only available in V8 engine and Chrome browser
    this.code = 404
    this.status = '404'
    this.title = 'Not Found: Resource does not exist.'
    this.detail = this.message
    console.log(this)
  }
}

export default ResourceNotFoundError
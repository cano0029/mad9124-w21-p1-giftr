class ResourceNotFound extends Error {
  constructor (...args) {
    super (...args) 
    Error.captureStackTrace(this, ResourceNotFound) 
    
    this.code = '404'
    this.status = 'Not Found'
    this.title = 'Resource does not exist.'
    this.detail = this.message
  }
}

export default ResourceNotFound
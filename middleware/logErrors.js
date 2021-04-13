import createDebug from 'debug'
const debug = createDebug('Giftr:errorLog')


export default function logErrors(err, req, next) {
  debug(error)
  next(error)
}
// You should separate the HTTP server from the Express app
import http from 'http'
import app from './app.js'
import logger from './startup/logger.js'

const log = logger.child({ module: 'Giftr:httpServer' })

const httpServer = http.createServer(app)
const port = process.env.API_PORT || 3030
httpServer.listen(port) 
httpServer.on('error', onError)
httpServer.on('listening', onListening)

function onError(error){
    log.error(`Express failed to listen on port ${this.address().port} ...`, err.stack)
}
function onListening() {
    log.info(`Express is listening on port ${this.address().port} ...`)
}


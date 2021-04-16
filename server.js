// You should separate the HTTP server from the Express app
import http from 'http'
import app from './app.js'
import logger from './startup/logger.js'

const log = logger.child({ module: 'Giftr:httpServer' })

const httpServer = http.createServer(app)

const port = process.env.PORT || 3030
httpServer.listen(port, () => {
    log.info(`HTTP server listening on port ${port}`)
})

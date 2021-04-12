// You should separate the HTTP server from the Express app
import http from 'http'
import app from './app.js'
import createDebug from 'debug'

const debug = createDebug('maddemo:httpServer')

const httpServer = http.createServer(app)

const port = process.env.PORT || 3030
httpServer.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`)
    // debug(`HTTP server listening on port ${port}`) ... this doesnt working
})


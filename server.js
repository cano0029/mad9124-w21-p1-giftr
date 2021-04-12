// You should separate the HTTP server from the Express app
import http from 'http'
import app from ('./app.js')

const httpServer = http.createServer(app)

const port = process.env.PORT || 3030
httpServer.listen(port, () => {
  console.log(`HTTP server is listening on port ${httpServer.address().port}`)
})
const { parse } = require("url");
const next = require("next");
const { createServer } = require("http");
require("dotenv").config();


const port = parseInt(process.env.NEXT_PUBLIC_PORT || '3001', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : 'production'
    }`
  )
})
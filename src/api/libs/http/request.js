const Logger = require('../logger/')

class Request {
  method = null
  path = null
  queries = {}
  headers = {}
  //
  body = {}

  log = new Logger('Request')

  constructor(chunk = '') {
    const req = this.parseRequest(chunk)
    //
    this.method = this.parseMethod(req)
    this.path = this.parsePath(req)
    this.queries = this.parseQueries(req)
    this.headers = this.parseHeaders(req)
    this.body = this.parseBody(req)
  }

  parseRequest(chunk) {
    this.log.info('parseRequest', { chunk: null })
    //
    return chunk.toString()
  }

  getFirstLine(req) {
    this.log.info('getFirstLine', { req: null })
    //
    const lines = req.split(/\r\n/ig)
    return lines[0].split(' ')
  }

  parseMethod(req) {
    this.log.info('parseMethod', { req: null })
    //
    const [method] = this.getFirstLine(req)
    return method
  }

  parsePath(req) {
    this.log.info('parsePath', { req: null })
    //
    const [, fullpath,] = this.getFirstLine(req)
    const [path,] = fullpath.split('?')
    return path
  }

  parseQueries(req) {
    this.log.info('parseQueries', { req: null })
    //
    const [, fullpath,] = this.getFirstLine(req)
    const [, queries = ''] = fullpath.split('?')
    return new URLSearchParams(queries)
  }

  parseHeaders(req) {
    this.log.info('parseHeaders', { req: null })
    //
    const [head] = req.split(/\r\n\r\n/ig)
    const [, ...headers] = head.split(/\r\n/ig)
    //
    return headers.reduce((h, line) => {
      const [key, value = ''] = line.split(': ', 2)
      h[key] = value
      return h
    }, {})
  }

  parseBody(req) {
    this.log.info('parseBody', { req: null })
    //
    const [, body] = req.split(/\r\n\r\n/ig)
    //
    return body
  }
}

module.exports = Request

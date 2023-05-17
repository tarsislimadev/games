const Request = require('./request.js')

const Logger = require('../logger/')
const { BREAK_LINE } = require('../constants/')

const STATUS_MESSAGE = {
  200: 'OK',
  400: 'CLIENT ERROR',
  404: 'NOT FOUND',
  500: 'SERVER ERROR',
}

class Response {
  request = null
  response = {
    status: 404,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: {},
  }

  log = new Logger('Response')

  constructor(request = new Request('')) {
    this.request = request
  }

  setStatus(status = 200) {
    this.log.info('setStatus', { status })
    //
    this.response.status = status
    //
    return this
  }

  setJSON(body = {}) {
    this.log.info('setbody', { body })
    //
    this.setStatus(200)
    this.addHeader('Content-Type', 'application/json')
    //
    this.response.body = body
    //
    return this
  }

  addHeader(key, value = '') {
    this.log.info('addHeader', { key, value })
    //
    this.response.headers[key] = value
    //
    return this
  }

  getFirstLine() {
    this.log.info('getFirstLine', {})
    //
    const { status } = this.response

    const line = ['HTTP/1.1']
    line.push(status)
    line.push(STATUS_MESSAGE[status])
    return line.join(' ')
  }

  getHeaders() {
    this.log.info('getHeaders', {})
    //
    const { headers } = this.response
    //
    return Object.keys(headers).map(key => (`${key}: ${headers[key]}`))
  }

  getBodyString() {
    this.log.info('getBodyString', {})
    //
    return JSON.stringify(this.response.body, null, 4)
  }

  toString() {
    this.log.info('toString', {})
    //

    return [
      this.getFirstLine(),
      ...this.getHeaders(),
      '',
      this.getBodyString(),
      '',
    ].join(BREAK_LINE)
  }
}

module.exports = Response

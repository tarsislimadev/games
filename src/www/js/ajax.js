import Logger from './logger.js'

class Response {
  log = new Logger('Response')

  constructor(message) {
    this.message = message
  }

  getMessage() {
    this.log.info('getMessage', {})
    return this.message
  }
}

class ApplicationResponse extends Response {
  constructor({ status, data, message } = {}) {
    super(message)
    this.log.info('constructor', { status, data, message })
    this.status = status
    this.data = data
  }

  getStatus() {
    this.log.info('getStatus', {})
    return this.status
  }

  getData() {
    this.log.info('getData', {})
    return this.data || {}
  }

  get(key) {
    this.log.info('get', { key })
    return this.getData()[key] || null
  }

}

class SuccessResponse extends ApplicationResponse { }
class ErrorResponse extends ApplicationResponse {
  type = 'network'
}

const Ajax = {
  log: new Logger('Ajax'),
  post: (paths = [], data = {}) => new Promise((res, rej) => {
    Ajax.log.info('post', { paths, data })

    const xhr = new XMLHttpRequest()

    const onComplete = (xhr) => {
      const response = JSON.parse(xhr.responseText)

      xhr.status === 200
        ? res(new SuccessResponse(response))
        : rej(new ErrorResponse(response))
    }

    xhr.open('POST', paths.join('/'), true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = () => onComplete(xhr)
    xhr.onerror = () => onComplete(xhr)
    xhr.send(JSON.stringify(data))
  })
}

export default Ajax

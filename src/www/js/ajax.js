
class Response {
  constructor(message) {
    this.message = message
  }

  getMessage() {
    return this.message
  }
}

class ApplicationResponse extends Response {
  constructor(status, data, message) {
    super(message)
    //
    this.status = status
    this.data = data
  }

  getStatus() {
    return this.status
  }

  getData() {
    return this.data || {}
  }

  get(key) {
    return this.getData()[key] || null
  }

}

class SuccessResponse extends ApplicationResponse { }
class ErrorResponse extends ApplicationResponse {
  type = 'network'
}

const Ajax = {
  post: (paths = [], data = {}) => new Promise((res, rej) => {
    const xhr = new XMLHttpRequest()

    const onComplete = () => {
      const response = JSON.parse(xhr.responseText)

      xhr.status === 200
        ? res(new SuccessResponse(response))
        : rej(new ErrorResponse(response))
    }

    xhr.open('POST', paths.join('/'), true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = () => onComplete()
    xhr.onerror = () => onComplete()
    xhr.send(JSON.stringify(data))
  })
}

export default Ajax

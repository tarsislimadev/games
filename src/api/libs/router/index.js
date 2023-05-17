const Logger = require('../logger/')

class Router {
  log = new Logger('Router')

  routes = {}

  post(path, action = () => { }) {
    this.log.info('post', { path, action })

    if (!this.routes[path])
      this.routes[path] = []

    this.routes[path].push(action)
  }

  run(req, res) {
    this.log.info('run', { req, res })

    if (this.routes[req.path]) {
      return this.routes[req.path]
        .reduce((_res, action) => action(req, _res), res)
    }

    return res
  }
}

module.exports = Router

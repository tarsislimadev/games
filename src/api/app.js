const Router = require('./libs/router/')
const Logger = require('./libs/logger/')

const router = new Router()
const log = new Logger('API')

router.post('/games/list', (req, res) => {
  log.info('/games/list', { req, res })
  //
  return res.setJSON({ list: [] })
})

module.exports = router

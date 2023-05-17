const Router = require('./libs/router/')
const Logger = require('./libs/logger/')

const router = new Router()
const log = new Logger('API')

router.post('/games/list', (req, res) => {
  log.info('/games/list', { req, res })
  //
  return res.setJSON({
    list: [
      {
        image: 'http://127.0.0.1:8080/img/game.png',
        name: 'Game App',
        price: 1.0,
        link: 'http://127.0.0.1:8080/games/game-app/',
      },
      {
        image: 'http://127.0.0.1:8080/img/game.png',
        name: 'Game App 1',
        price: 1.2,
        link: 'http://127.0.0.1:8080/games/game-app-1/',
      },
    ]
  })
})

module.exports = router

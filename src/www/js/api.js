import Ajax from './ajax.js'
import config from './config.js'
import Logger from './logger.js'

const API = {
  log: new Logger('API'),
  listGames: () => {
    API.log.info('listGames', {})
    return Ajax.post([config.servers.default.url, 'games', 'list'])
  },
}

export default API

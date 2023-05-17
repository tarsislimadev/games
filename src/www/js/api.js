import Ajax from './ajax.js'
import config from './config.js'

const API = {
  listGames: () => Ajax.post([config.servers.default.url, 'games', 'list']),
}

export default API

const {
  PORT = '80',
  DATA_PATH = '/tmp/games_data/',
} = process.env

module.exports = {
  http: {
    port: PORT,
  },
  database: {
    data_path: DATA_PATH,
  },
}

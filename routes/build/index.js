const controllers = require('../../controllers')

module.exports = {
  '/': {
    'POST': [
      controllers.builder.buildFile
    ]
  },
  '/download': {
    'GET': [
      controllers.builder.download
    ]
  }
}

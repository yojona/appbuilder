const controllers = require('../../controllers')

module.exports = {
  '/': {
    'POST': [
      controllers.builder.buildFile
    ],
    'GET': [
      controllers.builder.get.buildFile
    ]
  }
}
const Project = require('../models/Project')
const ProjectManager = require('../models/ProjectManager')
const log = require('../lib/log')
const PROJECT_PATH = 'projects'

module.exports = {
  buildFile: async (req, res) => {
    const io = req.app.get('socketio')
    const id = req.body.id
    const name = req.body.name
    const bundle = req.body.bundle

    const project = new Project(id, name, bundle, PROJECT_PATH)

    try {
      ProjectManager.setEmitter(io)
      ProjectManager.build(project)
    } catch (e) {
      project.error(e)
    }

    res.json({success: true})
  },
  download: (req, res) => {
    const id = req.query.id
    const name = req.query.name
    res.download(`${PROJECT_PATH}/${id}/bundle.zip`, `${name}.zip`)
  }
}
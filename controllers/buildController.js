const Project = require('../models/Project')
const ProjectManager = require('../models/ProjectManager')
const log = require('../lib/log')
const PROJECT_PATH = 'projects'

module.exports = {
  buildFile: (req, res) => {
    console.log(req.files)
    res.json({msg: 'hola'})
  },
  get: {
    buildFile: async (req, res) => {
      const name = req.query.name
      const bundle = req.query.bundle
      
      const project = new Project('2019', name, bundle, PROJECT_PATH)

      try {
        ProjectManager.build(project)
      } catch (e) {
        project.error(e)
      }

      res.json({success: false})
    }
  }
}
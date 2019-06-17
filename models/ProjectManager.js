let io = null
let status = [];

class ProjectManager {
  static async build (project) {
    this.reset()

    await project.init()
    this.emit(project)

    await project.create()
    this.emit(project)    

    await project.addPlatform()
    this.emit(project)

    await project.build()
    this.emit(project)

    await project.prepare()
    this.emit(project)

    this.result(project)
  }

  static retrieve (project) {
    project.retrieve()
  }

  static reset () {
    status = []
  }
  static setEmitter (socket) {
    io = io || socket
  }

  static emit(p) {
    console.log(p.getProgress())
    status.push(p.getProgress())
    io.sockets.emit('messages', status);

    io.on('connection', function (a) {
      io.sockets.emit('messages', status);
    })
  }

  static result(p) {
    const data = {
      id: p.id,
      name: p.name
    }
    io.sockets.emit('download', data);
  }
}

module.exports = ProjectManager

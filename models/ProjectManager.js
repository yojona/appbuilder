class ProjectManager {
  static async build (project) {
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
  }

  static retrieve (project) {
    project.retrieve()
  }

  static emit(p) {
    const label = `${p.getProgress().porcent}% ${p.getProgress().label}...`
    console.log(label)
  }
}

module.exports = ProjectManager
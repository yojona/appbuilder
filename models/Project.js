const run = require('../lib/run')

class Project {
  constructor(id, name, bundle, path) {
    this.id = id
    this.name = name
    this.bundle = bundle
    this.path = path
    this.buildStatus = 0
    this.statusLabel = ''
  }

  async init () {
    try {
      await run(this.path, `rm -rf ${this.id}`)
      await run(this.path, `cordova telemetry off`)
      this.setProgress(10, 'setup project')
    } catch (e) {
      this.error(e)
    }
  }

  async create () {
    try {
      await run(this.path, `cordova create ${this.id} ${this.bundle} ${this.name}`)
      this.setProgress(30, 'create project')
    } catch (e) {
      this.error(e)
    }
  }

  async addPlatform (platform) {
    try {
      const dir = `${this.path}/${this.id}`
      await run(dir, `cordova platform add android`)
      this.setProgress(50, 'add android platform')
    } catch (e) {
      this.error(e)
    }
  }

  async build (platform) {
    try {
      const dir = `${this.path}/${this.id}`
      await run(dir, `cordova build android`)
      this.setProgress(90, 'build project')
    } catch (e) {
      this.error(e)
    }
  }

  async prepare () {
    try {
      const dir = `${this.path}/${this.id}`
      const buildPath = `${dir}/platforms/android/app/build/outputs/apk`
      await run(buildPath, `zip -r bundle.zip .`)
      await run(buildPath, `mv -f bundle.zip ${process.cwd()}/${dir}`)
      this.setProgress(100, 'done')
    } catch (e) {
      this.error(e)
    }
  }

  retrieve () {
    return `${this.path}/${this.id}/${this.name}.zip`
  }

  setProgress (progress, label) {
    this.buildStatus = progress
    this.statusLabel = label
  }

  error(e) {
    this.setProgress(0)
    console.log(`Error building project: ${e}`)
  }

  getProgress () {
    return {
      porcent: this.buildStatus,
      label: this.statusLabel
    }
  }
}

module.exports = Project

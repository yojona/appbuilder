module.exports = {
  '/': {
    'GET': [(req, res) => res.sendFile(`${process.cwd()}/client/index.html`)]
  }
}

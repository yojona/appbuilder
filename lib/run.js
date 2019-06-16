const exec = require('child_process').exec

function run(path, cmd) {
    return new Promise((resolve, reject) => {
     exec(cmd, {cwd: path}, (error, stdout, stderr) => {
      if (error) {
       reject(error)
      }
      resolve(stdout? stdout : stderr);
     });
    });
   }

module.exports = run

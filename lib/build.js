const run = require('./run')

function build (name, bundle) {
    run(`ls &&
        echo "hola papu" > test.txt &&
        ls &&
        cat test.txt &&
        rm test.txt &&
        ls`)
    .then(a => console.log(a))
    .catch(e => console.log('error papu' + e))
}

build("a", "n")
// const {foo} = require('./helpers/helper')
//
// console.log('______main.js_____');
//
//
// console.log(__dirname);
// console.log(__filename);
// console.log(process.cwd());
// foo()
//
//
// // module ReadLine
// const readLine  = require('node:readline')
//
// const funct = async () => {
//     const rlInstance = readLine.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     })
//     rlInstance.question('What is your name?', (name) => {
//         console.log(`Hello ${name}`)
//         rlInstance.close()
//     })
// }
//
// void funct()


// module HTTP

const httpModule = require('node:http')

const http = httpModule.createServer(function (req, res) {
    res.write('Hello World!');
    res.end();
}).listen(8080);

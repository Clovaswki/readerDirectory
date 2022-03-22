const fs = require('fs')
const readLine = require('readline')

var fileWord = fs.readFileSync('../texts/word-document.pdf')

console.log(fileWord.toString())

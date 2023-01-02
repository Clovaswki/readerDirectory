const fs = require('fs')
const readLine = require('readline')

const searchFile = {
    correctFile: [],//array que armazenará o filename do file que corresponde à condição
    lines: [], //cada linha de texto será dada como uma posição do array

    async getFileOfDirectory(filePath, param) {
        var file = fs.createReadStream('../../documentos/' + filePath)

        const rl = readLine.createInterface({
            input: file,
            crlfDelay: Infinity
        })


        //laço que irá iterar as linhas de texto do arquivo e armazenará no array
        for await (var line of rl) {
            this.lines.push(line)
        }
        //laço que irá iterar o array com as linhas de texto do file
        /*lines.forEach((text) => {
            if(text.includes('bolha')){ //verificará se determinada string está contida numa linha de texto do file
                correctFile.push(filePath)//caso a condição acima seja atendida, o nome do file será adicionado ao array 
            }
        })*/
        for (var i = 0; i < this.lines.length; i++) {
            if (this.lines[i].includes(param)) { //verificará se determinada string está contida numa linha de texto do file
                correctFile.push(filePath)//caso a condição acima seja atendida, o nome do file será adicionado ao array 
                i = line.length
            }
        }

        this.lines = [] //esvaziando o array para a próxima repetição
    },

    init(param , directory) {
        var pathFiles = fs.readdirSync(directory) //lista de arquivos do diretório
        var paths = []

        for (var key in pathFiles) {
            if (pathFiles[key].split('.').pop() == "txt") {
                paths.push(pathFiles[key])
            }
        }

        paths.forEach((path) => { //repetição da função de acordo com a quant. de files no diretório
            getFileOfDirectory(path, param)
        })

        setTimeout(() => {//bloco de código executado 1s após o laço 
            if (correctFile.length == 0) {
                return console.log("O texto passado como parâmetro de busca não foi encontrado nos arquivos do diretório")
            }
            console.log(...this.correctFile)
        }, 50)
    }

}

var param = 'qualquer coisa'
var directory = '../../documentos'

searchFile.init(param, directory)
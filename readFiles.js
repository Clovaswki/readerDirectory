const fs = require('fs')
const readLine = require('readline')

var fileCorrect = []//array que armazenará o filename do file que corresponde à condição
var lines = [] //cada linha de texto será dada como uma posição do array
//função que irá ler todas as linhas de todos os arquivos do diretório e verificar
async function getFileOfDirectory(filePath){

    var file = fs.createReadStream('../../documentos/'+filePath)

    const rl = readLine.createInterface({
        input: file,
        crlfDelay: Infinity
    })


    //laço que irá iterar as linhas de texto do arquivo e armazenará no array
    for await (var line of rl){
        lines.push(line)
    }
    //laço que irá iterar o array com as linhas de texto do file
    /*lines.forEach((text) => {
        if(text.includes('bolha')){ //verificará se determinada string está contida numa linha de texto do file
            fileCorrect.push(filePath)//caso a condição acima seja atendida, o nome do file será adicionado ao array 
        }
    })*/
    for(var i=0; i < lines.length; i++){
        if(lines[i].includes('bolha')){ //verificará se determinada string está contida numa linha de texto do file
            fileCorrect.push(filePath)//caso a condição acima seja atendida, o nome do file será adicionado ao array 
            i = line.length
        }
    }

    lines = [] //esvaziando o array para a próxima repetição

}


function process(){
    
    var pathFiles = fs.readdirSync('../../documentos') //lista de arquivos do diretório
    var paths = []
    
    for(var key in pathFiles){
        if(pathFiles[key].split('.').pop() == "txt"){
            paths.push(pathFiles[key])
        }
    }

    paths.forEach((path) => { //repetição da função de acordo com a quant. de files no diretório
        getFileOfDirectory(path)
    })  

    setTimeout(() => {//bloco de código executado 1s após o laço 
        if(fileCorrect.length == 0){
            return console.log("O texto passado como parâmetro de busca não foi encontrado nos arquivos do diretório")
        }
        console.log(...fileCorrect)
    }, 50)

}
process()
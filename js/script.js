/**
* @param {string} cep 
* @returns {Objeto|null}
*/

async function obtemCEP(cep){
    const url = `http://viacep.com.br/ws/${cep}/json`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(error){
        console.error(error)
        return null
    }
}


async function consultarCep(){
    const cep = document.getElementById(`cep`).value 
    const resultadoCep = document.getElementById(`resultadoCep`)
    const logradouro = document.getElementById(`logradouro`)
    const cidade = document.getElementById(`cidade`)
    const bairro = document.getElementById(`bairro`)
    const estado = document.getElementById(`estado`)

    if(!cep || cep.length<8){
        resultadoCep.textContent = '🚨🚨 É obrigatório informar um cep!!'
        return
    } else {
        resultadoCep.textContent = ``
        const dadosCep = await obtemCEP(cep)
        if (dadosCep.erro){
            resultadoCep.textContent = `❌ ERRO AO CONSULTAR O CEP INFORMADO`
            return
        }
        logradouro.value = dadosCep.logradouro
        cidade.value = dadosCep.localidade
        bairro.value = dadosCep.bairro
        estado.value = dadosCep.uf
    }
}

//Tratar erro e consulta CEp
async function buscaEndereco(cep) {
  var msgErro = document.getElementById('erro');
  msgErro.innerHTML = "";
  try {
  var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    var consultaCepConvertida = await consultaCep.json();
    if(consultaCepConvertida.erro){
      throw Error('Cep não existente!');
    }
    //preenchimento automatico
    var cidade = document.getElementById('cidade');
    var logradouro = document.getElementById('endereco');
    var estado = document.getElementById('estado');

    cidade.value = consultaCepConvertida.localidade;
    logradouro.value = consultaCepConvertida.logradouro;
    estado.value = consultaCepConvertida.uf;

    console.log(consultaCepConvertida);
    return consultaCepConvertida;
  }catch(erro){
    msgErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
    console.log(erro)
  }
}
//
var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
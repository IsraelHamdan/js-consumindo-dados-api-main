/*(até aqui o codigo funciona) async function buscaEndereco () {



   try {
      var consultaCEP = await fetch('https://viacep.com.br/ws/01001250/json/');
      var consultaCEPConvertida = await consultaCEP.json();
      
      if(consultaCEPConvertida) {
         throw Error('CEP não existente!');
      }

      console.log(consultaCEPConvertida);

   } catch (erro) {
      console.log(erro)
   }
}

buscaEndereco(); */

async function buscaEndereco (cep) {
   const mensagemErro = document.getElementById('erro')
   mensagemErro.innerHTML= "";
   try {
      var consultaCEP = await fetch(`https://viaCEP.com.br/ws/${cep}/json/`);
      var consultaCEPConvertida = await consultaCEP.json();
      
      if(consultaCEPConvertida.erro) {
         throw Error ('CEP não existente!');
      }

      const bairro = document.getElementById('bairro');
      const complemento = document.getElementById('complemento');
      const logradouro = document.getElementById('endereco') ;
      const cidade = document.getElementById('cidade'); 
      const estado = document.getElementById('estado') ;

      cidade.value = consultaCEPConvertida.localidade ;
      logradouro.value = consultaCEPConvertida.logradouro ;
      bairro.value = consultaCEPConvertida.bairro;
      complemento.value = consultaCEPConvertida.complemento;
      estado.value = consultaCEPConvertida.uf ;

      console.log(consultaCEPConvertida);
      return consultaCEPConvertida;

   } catch (erro) {
     // console.log(erro)
      mensagemErro.innerHTML = '<p>CEP invalido. Tente novamente</p>'
   }
}

const cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));



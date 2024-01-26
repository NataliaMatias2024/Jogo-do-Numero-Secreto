// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
console.log (numeroSecreto);
let numeroTentativas = 1;
exibirMensagemIniciais();



function exibirNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemIniciais(){
    exibirNaTela('h1', 'Jogo do numero secreto');
    exibirNaTela('p' , 'Escolha um número entre 1 e 100');
}

function verificarChute() {
// como queremos analisar o numero digitado, sinalizamos isso com o .value no final//
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirNaTela('h1', 'Acertou!');
        let palavraTentativa = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabéns, você descobriu o número secreto com ${numeroTentativas} ${palavraTentativa}!`;
              exibirNaTela('p' , mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); 
    } else {
        if (chute > numeroSecreto){
            exibirNaTela('p' , 'O número secreto é menor!');
        } else {
            exibirNaTela('p' , 'O número secreto é maior!');
        }
    } 
    numeroTentativas++
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random () * numeroLimite + 1 );
    let quantidadeElementosNaLista = listaNumerosSorteados.length;
    if (quantidadeElementosNaLista == numeroLimite) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = ' ';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    console.log (numeroSecreto);
    numeroTentativas = 1;
    limparCampo();
    exibirMensagemIniciais();
    document.getElementById('reiniciar').setAttribute('disabled' , true); 
}
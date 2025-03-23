"use strict"; // Ativa o modo estrito do Javascript

// Container cadastro
const containerCadastro = document.querySelector("#cadastro");
const containerInputs = document.querySelector("#inputs");
const boxInput = [...document.querySelectorAll(".boxInput")];
const inputNomeUsuario = document.querySelector("#nomeUsuario");
const inputSenhaUsuario = document.querySelector("#senhaUsuario");
const inputEmailUsuario = document.querySelector("#emailUsuario");

// Buttons
const buttonEntrar = document.querySelector("#buttonEntrar");
const buttonCadastrar = document.querySelector("#buttonCadastrar");
const buttonVoltar = document.querySelector("#buttonVoltar");

// Container registrado
const containerRegistrado = document.querySelector("#registrado");
const buttonsRegistrados = [...document.querySelectorAll("#buttonsRegistros .buttonsRegistrados")];

// Variaveis para manipular a quantidade de tempo que o usuario fica nas telas do financeiro
let intervaloTempo; // Armazenara o tempo
let tempoIniciado = false; // Ve se o tempo iniciou

// Funcao para a verificacao de valor vazia
function isEmpty (value) {
    if (value === '') {
        return true;
    } else {
        return false;
    }
};

// Função para criar elementos de erro
function newElement (containerPai) {
    let erroSpan = containerPai.querySelector(".error");
    
    if (!erroSpan) { // Se ele nao existir, vai criar um elemento span
        erroSpan = document.createElement("span");
        erroSpan.setAttribute("class", "error");
        erroSpan.setAttribute("display", "block");
        erroSpan.innerHTML = '';
        containerPai.appendChild(erroSpan);
    }

    return erroSpan;

};

// Funcao para limpar campos
function limparCampos () {

    // Limpar todos os campos de erro
    document.querySelectorAll(".error").forEach((spanError) => {
        spanError.innerHTML = '';
    });

    inputNomeUsuario.value = '';
    inputSenhaUsuario.value = '';
    inputEmailUsuario.value = '';

};

// Funcao para gerar um codigo de conta novo a cada cliente
function gerarCodigo () {

    const primeiroDigito = 4;
    const outrosDigitos = Math.floor(Math.random() * 1000);
    const codigo = `${primeiroDigito}${String(outrosDigitos).padStart(3, '0')}`;

    return codigo;
};

// Funcao para validar os campos
function validacaoDados (value) {
    const validator = {
        eValid: true,
        mensagemErro: null
    }

    if (isEmpty(value)) {
        validator.eValid = false;
        validator.mensagemErro = 'O campo esta vazio!';
        return validator;
    }

    const tamanhoMinimo = 8;
    if (value.length < tamanhoMinimo) {
        validator.eValid = false;
        validator.mensagemErro = `O campo possui menos de ${tamanhoMinimo} caracteres!`;
        return validator;
    }

    if (!(inputEmailUsuario.style.display === 'none')) {
        if (isEmpty(value)) {
            validator.eValid = false;
            validator.mensagemErro = 'O campo esta vazio!';
            return validator;
        }
        const expressaoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!expressaoRegex.test(value)) {
            validator.eValid = false;
            validator.mensagemErro = 'O email é obrigatório!';
            return validator;
        }
        return validator;
    }

    return validator;

};

// Funcao
function validacao () {

    let isValid = true;
    const iconeErro = '<i class="fa-solid fa-circle-exclamation"></i>';

    // Nome
    const nomeValue = inputNomeUsuario.value;
    const containerPaiNome = inputNomeUsuario.closest(".boxInput");
    let erroSpanName =  newElement(containerPaiNome);

    const validacaoNome = validacaoDados(nomeValue);

    if (!validacaoNome.eValid) {
        isValid = false;
        erroSpanName.innerHTML = `${iconeErro} ${validacaoNome.mensagemErro}`;
    } else {
        erroSpanName.innerHTML = '';
    }

    // Senha
    const senhaValue = inputSenhaUsuario.value;
    const containerPaiSenha = inputSenhaUsuario.closest(".boxInput");
    let  erroSpanSenha = newElement(containerPaiSenha);

    const validacaoSenha = validacaoDados(senhaValue);

    if (!validacaoSenha.eValid) {
        isValid = false;
        erroSpanSenha.innerHTML = `${iconeErro} ${validacaoSenha.mensagemErro}`;
    } else {
        erroSpanSenha.innerHTML = '';
    }
    
    // Email
    if (!(inputEmailUsuario.style.display === 'none')) {
        const emailValue = inputEmailUsuario.value;
        const containerPaiEmail = inputEmailUsuario.closest(".boxInput");
        let erroSpanEmail = newElement(containerPaiEmail);
    
        const validacaoEmail = validacaoDados(emailValue);
    
        if (!validacaoEmail.eValid) {
            isValid = false;
            erroSpanEmail.innerHTML = `${iconeErro} ${validacaoEmail.mensagemErro}`
        } else {
            erroSpanSenha.innerHTML = '';
        }
    }

    if (isValid) {
        limparCampos();
        containerCadastro.style.display = 'none';
        containerRegistrado.style.display = 'block';
    }
};

// Para fazer as validacoes de inputs de nome e senha
const form = document.querySelector("#form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    validacao();
});


// Funcionalidades do botao cadastrar
buttonCadastrar.addEventListener("click", (event) => {
    event.preventDefault();

    inputEmailUsuario.style.display = 'block';
    buttonEntrar.style.display = 'none';

    validacao();

    limparCampos();

});

// Funcionalidades do botao 'voltar ao entrar'
buttonVoltar.addEventListener("click", (event) => {
    event.preventDefault();
    limparCampos();

    inputEmailUsuario.style.display = 'none';

    buttonEntrar.style.display = 'inline';

    const erroSpanEmail = newElement(
        inputEmailUsuario.closest('.boxInput')
    ).innerHTML = '';

});

// Adicionando tempo para cada tela de movimentação financeira
// Assim que clicar em cada botao do financeiro, adicionar um tempo de 60 segundos maximos que o usuario pode ficar na tela. Quando o tempo finalizar, volta para o container registrados


// Funcionalidades para o botao de depositar
const buttonDepositar = document.querySelector("#buttonDepositar");

// Função para iniciar o tempo
function contagemTempo () {
    const delay = setTimeout (() => {

    }, 500);
};
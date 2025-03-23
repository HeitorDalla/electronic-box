"use strict"; // Ativa o modo estrito do Javascript

// Container cadastro
const containerCadastro = document.querySelector("#cadastro");
const form = document.querySelector("#form");
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


// Oculta o campo de email inicialmente
inputEmailUsuario.style.display = 'none';

// Oculta o container registrado inicialmente
containerRegistrado.style.display = 'none';

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

// Funcao para a verificacao de valor vazia
function isEmpty (value) {
    if (value === '') {
        return true;
    } else {
        return false;
    }
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

    return validator;

};

function validarEmail (value) {
    const validator = {
        eValid: true,
        mensagemErro: null
    }

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

// Funcao para limpar campos
function limparCampos () {

    // Limpar campos de erro
    const erroSpanName = newElement(inputNomeUsuario.closest('.boxInput'));
    erroSpanName.innerHTML = '';
    const erroSpanSenha = newElement(inputSenhaUsuario.closest('.boxInput'));
    erroSpanSenha.innerHTML = '';

    // Limpar os campos de input
    inputNomeUsuario.innerHTML = '';
    inputSenhaUsuario.innerHTML = '';
    inputEmailUsuario.innerHTML = '';

    inputNomeUsuario.value = '';
    inputSenhaUsuario.value = '';
    inputEmailUsuario.value = '';

}

// Para fazer as validacoes de inputs
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;
    const iconeErro = '<i class="fa-solid fa-circle-exclamation"></i>';

    inputEmailUsuario.style.display = 'none';

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

    if (isValid) {
        limparCampos();
        containerCadastro.style.display = 'none';
        containerRegistrado.style.display = 'block';
    }

});

// Funcionalidades do botao cadastrar
buttonCadastrar.addEventListener("click", (event) => {
    event.preventDefault();

    let isValidCadastrar = true;
    const iconeErro = '<i class="fa-solid fa-circle-exclamation"></i>';

    limparCampos();

    // Criar o elemento input email
    inputEmailUsuario.style.display = 'inline';

    // Oculta o campo do button entrar
    buttonEntrar.style.display = 'none';

    // Validação do botao email
    const emailValue = inputEmailUsuario.value;
    const containerPaiEmail = inputEmailUsuario.closest(".boxInput");
    let erroSpanEmail = newElement(containerPaiEmail);

    const validacaoEmail = validarEmail(emailValue);

    if (!validacaoEmail.eValid) {
        isValidCadastrar = false;
        erroSpanEmail.innerHTML = `${iconeErro} ${validacaoEmail.mensagemErro}`
    } else {
        erroSpanSenha.innerHTML = '';
    }

    if (isValidCadastrar) {
        alert("Cadastro feito com sucesso!");
    }

});

// Funcionalidades do botao 'voltar ao entrar'
buttonVoltar.addEventListener("click", (event) => {
    event.preventDefault();

    // Limpar erros
    limparCampos();

    inputEmailUsuario.style.display = 'none';

    buttonEntrar.style.display = 'inline';

    const erroSpanEmail = newElement(
        inputEmailUsuario.closest('.boxInput')
    ).innerHTML = '';

});


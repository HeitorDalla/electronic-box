"use strict"; // Ativa o modo estrito do Javascript

const form = document.querySelector("#form");
const containerInputs = document.querySelector("#inputs");
const boxInput = [...document.querySelectorAll(".boxInput")];
const inputNomeUsuario = document.querySelector("#nomeUsuario");
const inputSenhaUsuario = document.querySelector("#senhaUsuario");
const inputEmailUsuario = document.querySelector("#emailUsuario");

// Oculta o campo de email inicialmente
inputEmailUsuario.style.display = 'none';

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

// Para fazer as validacoes de inputs
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formIsValid = true;
    const iconeErro = '<i class="fa-solid fa-circle-exclamation"></i>';

    // Nome
    const nomeValue = inputNomeUsuario.value;
    const containerPaiNome = inputNomeUsuario.closest(".boxInput");
    let erroSpanName =  newElement(containerPaiNome);

    const validacaoNome = validacaoDados(nomeValue);

    if (!validacaoNome.eValid) {
        formIsValid = false;
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
        formIsValid = false;
        erroSpanSenha.innerHTML = `${iconeErro} ${validacaoSenha.mensagemErro}`;
    } else {
        erroSpanSenha.innerHTML = '';
    }

    if (formIsValid) {
        form.submit();
    }

});
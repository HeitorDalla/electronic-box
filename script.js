"use strict"; // Ativa o modo estrito do Javascript

const inputs = {}; // Objeto que contem todos os inputs (chave: id; valor: valor do campo)

const containerCadastro = document.querySelector("#cadastro");
const containerInputs = document.querySelector("#inputs");

// Função para criar elementos
function newElement () {
    const novoElemento = document.createElement("input");
    novoElemento.setAttribute("class", "inputs");
    containerCadastro.appendChild(novoElemento);
    return novoElemento;
};

// Funcao para atualizar os inputs dentro do objeto global
function atualizarInputs () {
    const elementosInput = document.querySelectorAll(".inputs");
    elementosInput.forEach((input) => {
        inputs[input.id] = input.value;
    })
};

// Oculta o campo de email inicialmente
document.querySelector("#emailUsuario").style.display = 'none';

// Funcionalidades botao entrar
const buttonEntrar = document.querySelector("#buttonEntrar");
buttonEntrar.addEventListener("click", (event) => {
    const name = document.querySelector("#nomeUsuario");
    const nameValue = name.value;
});

// Funcionalidades botao cadastrar
const buttonCadastrar = document.querySelector("#buttonCadastrar");
buttonCadastrar.addEventListener("click", (event) => { 
    newElement();
});


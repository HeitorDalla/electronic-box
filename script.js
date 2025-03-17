"use strict";

const containerCadastro = document.querySelector("#cadastro");

// Função para criar elementos
function newElement () {
    const novoElemento = document.createElement("input");
    novoElemento.setAttribute("class", "inputs");
    containerCadastro.appendChild(novoElemento);
    return novoElemento;
};

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



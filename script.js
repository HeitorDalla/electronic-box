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
const nome = document.querySelector("#nome");
const conta = document.querySelector("#conta")
const saldo = document.querySelector("#saldo");
const buttonsRegistrados = [...document.querySelectorAll("#buttonsRegistros .buttonsRegistrados")];

// Variaveis para manipular a quantidade de tempo que o usuario fica nas telas do financeiro
let intervaloTempo; // Armazenara o tempo
let tempoIniciado = false; // Ve se o tempo iniciou

// Funcao para a verificacao de valor vazia
function isEmpty(value) {
    if (value === '') {
        return true;
    } else {
        return false;
    }
};

// Função para criar elementos de erro
function newElement(containerPai) {
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
function limparCampos() {

    // Limpar todos os campos de erro
    document.querySelectorAll(".error").forEach((spanError) => {
        spanError.innerHTML = '';
    });

    inputNomeUsuario.value = '';
    inputSenhaUsuario.value = '';
    inputEmailUsuario.value = '';

    document.querySelector("#depositar").value = '';

};

// Funcao para gerar um codigo de conta novo a cada cliente
function gerarCodigo() {

    const primeiroDigito = 4;
    const outrosDigitos = Math.floor(Math.random() * 1000);
    const codigo = `${primeiroDigito}${String(outrosDigitos).padStart(3, '0')}`;

    return codigo;
};

// Funcao para pegar o saldo do deposito
function pegarSaldo (input) {
    let saldoAtual = parseFloat(saldo.textContent.replace("R$ ", ""));

    if () {
        // Quero que aqui seja feito uma validacao que se for o depositar, soma, se nao for, diminui
    }
    let saldoNovo = saldoAtual + parseFloat(input);

    saldo.textContent = `R$: ${saldoNovo.toFixed(2)}`;

    return saldo;
};

// Funcao para validar os campos
function validacaoDados(value) {
    const validator = {
        eValid: true,
        mensagemErro: null
    }

    if (isEmpty(value)) {
        validator.eValid = false;
        validator.mensagemErro = 'O campo esta vazio!';
        return validator;
    }

    const tamanhoMinimo = 6;
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
function validacao() {

    let isValid = true;
    const iconeErro = '<i class="fa-solid fa-circle-exclamation"></i>';

    // Nome
    const nomeValue = inputNomeUsuario.value;
    const containerPaiNome = inputNomeUsuario.closest(".boxInput");
    let erroSpanName = newElement(containerPaiNome);

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
    let erroSpanSenha = newElement(containerPaiSenha);

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

        // Colocar informacoes do usuario
        nome.textContent = nomeValue;
        conta.textContent = gerarCodigo();
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
const buttonDepositar = document.querySelector(".buttonDepositar").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#deposito").style.display = 'block';
    
    document.querySelector("#deposito .depositar").addEventListener("click", (event) => {
        event.preventDefault();

        const depositoInput = document.querySelector("#depositar").value;
        if (isNaN(depositoInput) || depositoInput <= 0) {
            alert("Digite um valor valido!");
            return;
        }

        getSaldo(depositoInput);

        limparCampos();

        alert(`Foi depositado um valor de R$ ${depositoInput},00`);

        document.querySelector("#deposito").style.display = 'none';
    });

    document.querySelector("#deposito .cancelar").addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#deposito").style.display = 'none';
        limparCampos();
    });
    
});

// Funcionalidades para o botao 'sacar'
const buttonSacar = document.querySelector(".buttonSacar").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#saque").style.display = 'block';

    document.querySelector(".sacar").addEventListener("click", (event) => {
        event.preventDefault();

        const sacarInput = document.querySelector("#sacar").value;
        if (sacarInput <= 0 || isNaN(sacarInput)) {
            alert("Digite valores válidos!");
            return;
        }

        getSaldo(sacarInput);

        limparCampos();

        alert(`Foi sacado um R$ ${sacarInput},00`);

        document.querySelector("#saque").style.display = 'none';
    });
    document.querySelector("#saque .cancelar").addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#sque").style.display = 'none';
        limparCampos();
    });

});
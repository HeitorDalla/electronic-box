"use strict"; // Ativa o modo estrito do Javascript

// Container Cadastro
const containerCadastro = document.querySelector("#cadastro");
const containerInputs = document.querySelector("#inputs");
const boxInput = [...document.querySelectorAll(".boxInput")];
const inputNomeUsuario = document.querySelector("#nomeUsuario");
const inputSenhaUsuario = document.querySelector("#senhaUsuario");
const inputEmailUsuario = document.querySelector("#emailUsuario");
const buttonEntrar = document.querySelector("#buttonEntrar");
const buttonCadastrar = document.querySelector("#buttonCadastrar");
const buttonVoltar = document.querySelector("#buttonVoltar");

// Container Registrado
const containerRegistrado = document.querySelector("#registrado");
const nome = document.querySelector("#nome");
const conta = document.querySelector("#conta")
const saldo = document.querySelector("#saldo");
// Buttons do Container Registrado
const buttonsRegistrados = [...document.querySelectorAll("#buttonsRegistros .buttonsRegistrados")];
const buttonDepositar = document.querySelector(".buttonDepositar");
const buttonSacar = document.querySelector(".buttonSacar");
const buttonHistorico = document.querySelector(".buttonHistorico");
const buttonSair = document.querySelector(".buttonSair");

// Container Deposito
const deposito = document.querySelector("#deposito");
const depositarInput = document.querySelector("#deposito #depositarInput");
const depositarButton = document.querySelector("#deposito .depositarButton");

// Container Saque
const saque = document.querySelector("#saque");
const sacarInput = document.querySelector("#saque #sacarInput");
const sacarButton = document.querySelector("#saque .sacarButton");

const cancelar = document.querySelector(".cancelar");

// Container Historico de transacoes
const historicoTransacoes = document.querySelector("#historicoTransacoes");
const historico = historicoTransacoes.querySelector("#historico");
const buttonVoltarHistorico = historicoTransacoes.querySelector("#voltar");

let transacoes = []; // Armazenar todas as transacoes
let modoCadastro = false; // Vai controlar se o formulário está em modo de login ou cadastro

// Funcao genérica para a verificacao de valor vazia
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

// Funcao genérica para limpar campos
function limparCampos() {

    // Limpar todos os campos de erro
    document.querySelectorAll(".error").forEach((spanError) => {
        spanError.innerHTML = '';
    });

    inputNomeUsuario.value = '';
    inputSenhaUsuario.value = '';
    inputEmailUsuario.value = '';

    depositarInput.value = '';
    sacarInput.value = '';
    historicoTransacoes.value = '';
};

// Funcao para evitar que dois containers sejam abertos ao mesmo tempo
function esconderContainers () {
    deposito.style.display = 'none';
    saque.style.display = 'none';
    historicoTransacoes.style.display = 'none';
};

// Funcao para gerar um codigo de conta novo a cada cliente
function gerarCodigo() {
    const primeiroDigito = 4;
    const outrosDigitos = Math.floor(Math.random() * 1000);
    const codigo = `${primeiroDigito}${String(outrosDigitos).padStart(3, '0')}`;

    return codigo;
};

// Funcao para pegar o saldo do deposito
function getSaldo (inputValor, tipo) {
    
    let saldoAtual = parseFloat(saldo.textContent.replace("R$", "").replace(":", "").replace(",", ".").trim());

    let saldoNovo;

    if (tipo === 'Deposito') {
        saldoNovo = saldoAtual + inputValor;
    } else {
        saldoNovo = saldoAtual - inputValor;
    }

    if (saldoNovo < 0) {
        alert(`Saldo insuficiente!`);
        return saldoAtual;
    }

    saldo.textContent = `R$: ${saldoNovo.toFixed(2).replace(".", ",")}`;

    return saldoNovo;
};

// Funcao para mostrar as transações financeiras
function mostrarTransacoes () {
    const containerHistorico = document.querySelector("#historicoTransacoes #historico");
    containerHistorico.innerHTML = ''; // Limpa o historico antigo

    transacoes.forEach((transacao) => {
        const operacao = document.createElement("div");
        operacao.setAttribute("class", "operacao");
        operacao.textContent = `${transacao.tipoOper}: R$ ${transacao.valor.toFixed(2).replace(".", ",")}`;
        containerHistorico.appendChild(operacao);
    });
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

// Para fazer as validacoes de inputs de nome e senha
document.querySelector("#form").addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true; // Validação global dos campos
    const iconeErro = '<i class="fa-solid fa-circle-exclamation"></i>'; // Icon de erro

    // Nome
    const nomeValue = inputNomeUsuario.value.trim();
    const erroSpanName = newElement(inputNomeUsuario.closest(".boxInput")); // Vai passar o container do input como referência

    const validacaoNome = validacaoDados(nomeValue);
    if (!validacaoNome.eValid) {
        isValid = false;
        erroSpanName.innerHTML = `${iconeErro} ${validacaoNome.mensagemErro}`;
    } else {
        erroSpanName.innerHTML = '';
    }

    // Senha
    const senhaValue = inputSenhaUsuario.value.trim();
    const erroSpanSenha = newElement(inputSenhaUsuario.closest(".boxInput"));

    const validacaoSenha = validacaoDados(senhaValue);
    if (!validacaoSenha.eValid) {
        isValid = false;
        erroSpanSenha.innerHTML = `${iconeErro} ${validacaoSenha.mensagemErro}`;
    } else {
        erroSpanSenha.innerHTML = '';
    }

    // E-mail
    if (inputEmailUsuario.style.display !== 'none') {
        const emailValue = inputEmailUsuario.value.trim();
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

        if (modoCadastro) {
            alert("Usuário cadastrado com sucesso!!");
        } else {
            alert("Login efetuado com sucesso!!");
        }
    }

});

// Funcionalidades do botao de cadastrar
buttonCadastrar.addEventListener("click", (event) => {
    event.preventDefault();
    limparCampos();
    inputEmailUsuario.style.display = 'block';
    modoCadastro = true;
});

// Funcionalidades do botao 'voltar ao entrar'
buttonVoltar.addEventListener("click", (event) => {
    event.preventDefault();
    limparCampos();
    inputEmailUsuario.style.display = 'none';
    modoCadastro = false;
});

// Funcionalidades para o botao de depositar
buttonDepositar.addEventListener("click", (event) => {
    event.preventDefault();  

    esconderContainers();

    deposito.style.display = 'block';
    
    deposito.querySelector(".depositarButton").addEventListener("click", (event) => {
        event.preventDefault();

        const inputValueDepositar = depositarInput.value.trim(); // Pegar o valor do campo de input
        const depositoInput = parseFloat(inputValueDepositar); // Transformar em numero o input que o usuário digitar
        if (isNaN(depositoInput) || depositoInput <= 0) { // Verificação para ver se é um numero e se ele nao é igual a zero
            alert("Digite um valor valido!");
            return;
        }

        getSaldo(depositoInput, 'Deposito');

        limparCampos();

        alert(`Foi depositado um valor de R$ ${depositoInput}`);

        transacoes.push({
            tipoOper: 'Deposito',
            valor: depositoInput
        });

        deposito.style.display = 'none';
    });
    
    deposito.querySelector(".cancelar").addEventListener("click", (event) => {
        event.preventDefault();

        deposito.style.display = 'none';
        limparCampos();
    })

});

// Funcionalidades para o botao 'sacar'
buttonSacar.addEventListener("click", (event) => {
    event.preventDefault();

    esconderContainers();

    saque.style.display = 'block';

    saque.querySelector(".sacarButton").addEventListener("click", (event) => {
        event.preventDefault();

        const inputValueSacar = sacarInput.value.trim(); // Peguei o valor digitado no input
        const sacarValor = parseFloat(inputValueSacar); // Transformei o valor digitado em número
        if (isNaN(sacarValor) || sacarValor <= 0) {
            alert("Digite um valor válido!");
            return;
        }

        getSaldo(sacarValor, 'Saque');

        limparCampos();

        alert(`Foi sacado um valor de R$ ${sacarValor}`);

        transacoes.push({
            tipoOper: 'Saque',
            valor: sacarValor
        });

        saque.style.display = 'none';
    });

    saque.querySelector(".cancelar").addEventListener("click", (event) => {
        event.preventDefault();
        saque.style.display = 'none';
        limparCampos();
    });

});

// Funcionalidades para o botao de 'historico'
buttonHistorico.addEventListener("click", (event) => {
    event.preventDefault();

    esconderContainers();

    historicoTransacoes.style.display = 'block';

    mostrarTransacoes();

    // Funcionalidades do campo sair do historico de transações
    buttonVoltarHistorico.addEventListener("click", (event) => {
        event.preventDefault();

        limparCampos();

        historicoTransacoes.style.display = 'none';
    });
});

// Funcionalidades para o botao 'sair'
buttonSair.addEventListener("click", (event) => {
    event.preventDefault();

    containerRegistrado.style.display = 'none';
    containerCadastro.style.display = 'block';
    containerCadastro.style.textAlign = 'center';
    
    limparCampos();
});
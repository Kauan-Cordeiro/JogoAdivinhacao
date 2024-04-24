let numeroSecreto;
let tentativasRestantes;

function comecarJogo(nivel) {
    const gameArea = document.querySelector('.game-area');
    gameArea.style.display = 'block';

    // Definir faixa de números com base no nível escolhido
    switch (nivel) {
        case 'facil':
            numeroSecreto = Math.floor(Math.random() * 40) + 1;
            tentativasRestantes = 3;
            break;
        case 'medio':
            numeroSecreto = Math.floor(Math.random() * (70 - 41 + 1)) + 41;
            tentativasRestantes = 3;
            break;
        case 'dificil':
            numeroSecreto = Math.floor(Math.random() * (100 - 71 + 1)) + 71;
            tentativasRestantes = 3;
            break;
        default:
            return;
    }

    const levelSelect = document.querySelector('.level-select');
    levelSelect.style.display = 'none';

    const minNumber = nivel === 'facil' ? 1 : (nivel === 'medio' ? 41 : 71);
    const maxNumber = nivel === 'facil' ? 40 : (nivel === 'medio' ? 70 : 100);

    const rangeInfo = `(${minNumber} - ${maxNumber})`;
    const instructions = `Adivinhe o número secreto dentro da faixa ${rangeInfo}.`;

    const gameAreaContent = `
        <p>${instructions}</p>
        <input type="number" id="tentativaInput" placeholder="Digite sua tentativa" min="${minNumber}" max="${maxNumber}">
        <button onclick="verificarTentativa()">Tentar</button>
        <p class="tentativas">Tentativas restantes: ${tentativasRestantes}</p>
        <ul class="tentativas-anteriores"></ul>
    `;

    gameArea.innerHTML = gameAreaContent;
}

function verificarTentativa() {
    const tentativaInput = document.getElementById('tentativaInput');
    const tentativa = parseInt(tentativaInput.value);

    if (tentativa === numeroSecreto) {
        exibirMensagem('Parabéns! Você acertou o número secreto.', 'green');
    } else {
        tentativasRestantes--;

        const resultado = tentativa < numeroSecreto ? 'maior' : 'menor';
        const mensagem = `Número incorreto. Tente um número ${resultado}.`;

        if (tentativasRestantes > 0) {
            exibirMensagem(mensagem, 'red');
            document.querySelector('.tentativas').textContent = `Tentativas restantes: ${tentativasRestantes}`;
            registrarTentativa(tentativa, resultado);
        } else {
            exibirMensagem(`Suas tentativas acabaram. O número secreto era ${numeroSecreto}.`, 'red');
            document.getElementById('tentativaInput').disabled = true;
        }
    }

    tentativaInput.value = '';
}

function registrarTentativa(tentativa, resultado) {
    const tentativasAnterioresList = document.querySelector('.tentativas-anteriores');
    const listItem = document.createElement('li');
    listItem.textContent = `Tentativa: ${tentativa} - Número correto é ${resultado} que ${tentativa}.`;
    tentativasAnterioresList.appendChild(listItem);
}

function exibirMensagem(mensagem, cor) {
    const tentativasElement = document.querySelector('.tentativas');
    tentativasElement.textContent = mensagem;
    tentativasElement.style.color = cor;

    setTimeout(() => {
        tentativasElement.textContent = '';
    }, 2000);
}
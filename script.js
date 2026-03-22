/**
 * script.js
 *
 * Lógica JavaScript para o aplicativo Cara ou Coroa.
 * Separa a manipulação do DOM e a lógica do jogo.
 *
 * Documentação de Funcionamento:
 * 1. `wins`: Variável global para armazenar o número de vitórias.
 * 2. `DOM Elements`: Referências aos elementos HTML para manipulação.
 * 3. `init()`: Função de inicialização que adiciona o event listener ao botão.
 * 4. `playGame()`:
 * a. Obtém a escolha do usuário.
 * b. Simula o lançamento da moeda (Cara ou Coroa aleatoriamente).
 * c. Atualiza visualmente a moeda com uma animação.
 * d. Compara o resultado com a aposta do usuário e atualiza as vitórias.
 * e. Exibe uma mensagem de resultado.
 */

// Variáveis de estado do jogo
let wins = 0;
let isAnimating = false; // Flag para evitar cliques múltiplos durante a animação

// Referências aos elementos do DOM
const userChoiceSelect = document.getElementById('userChoice');
const coinGraphic = document.getElementById('coinGraphic');
const playButton = document.getElementById('playButton');
const winCountSpan = document.getElementById('winCount');
const resultMessageP = document.getElementById('resultMessage');

/**
 * Função de inicialização que configura os listeners de evento.
 * É chamada quando o DOM está completamente carregado.
 */
document.addEventListener('DOMContentLoaded', () => {
    playButton.addEventListener('click', playGame);
    updateDisplay(); // Atualiza o display inicial de vitórias
});

/**
 * Atualiza os elementos visuais do jogo (vitórias, mensagens).
 */
function updateDisplay() {
    winCountSpan.textContent = wins;
}

/**
 * Reinicia o visual da moeda para o estado inicial '?'
 */
function resetCoinDisplay() {
    coinGraphic.innerHTML = '<span>?</span>';
    coinGraphic.style.transform = 'rotateY(0deg)'; // Garante que esteja na posição inicial
}

/**
 * Simula o lançamento da moeda e atualiza o estado do jogo.
 */
async function playGame() {
    if (isAnimating) {
        return; // Impede múltiplos cliques durante a animação
    }
    isAnimating = true; // Inicia a animação, bloqueia novos cliques

    const userChoice = userChoiceSelect.value; // Pega a escolha do usuário ("Cara" ou "Coroa")
    
    // Esconde a mensagem anterior
    resultMessageP.textContent = ''; 

    // Animação de rotação inicial
    coinGraphic.style.transition = 'transform 0.2s linear'; // Transição mais rápida para o "giro"
    coinGraphic.style.transform = 'rotateY(360deg)';
    coinGraphic.innerHTML = '<span>...</span>'; // Indicador de "girando"

    // Aguarda um breve momento antes de sortear e mostrar o resultado
    await new Promise(resolve => setTimeout(resolve, 300)); // Pequena pausa para o giro inicial

    // Lógica de sorteio: 0 para Cara, 1 para Coroa
    const randomNumber = Math.random(); // Gera um número entre 0 (inclusivo) e 1 (exclusivo)
    const result = randomNumber < 0.5 ? "Cara" : "Coroa"; // 50% de chance para cada

    // Animação final da moeda
    coinGraphic.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // Efeito "saltitante"
    
    // Define a rotação final baseada no resultado para dar um "susto" visual
    // Se for Cara, rotaciona para mostrar "Cara". Se for Coroa, mostra "Coroa".
    // Isso é mais estético do que funcional para o 3D real, mas é um bom truque.
    // Para simplificar, vamos apenas girar e mostrar o resultado.
    
    // Reinicia a rotação Y para o efeito "spin" visível
    coinGraphic.style.transform = 'rotateY(0deg)'; 
    coinGraphic.innerHTML = `<span>${result}</span>`; // Exibe o resultado na moeda

    // Aguarda o final da animação antes de processar o resultado
    setTimeout(() => {
        // Verifica se o usuário venceu
        if (result === userChoice) {
            wins++; // Incrementa o contador de vitórias
            resultMessageP.textContent = `🥳 Parabéns! Caiu ${result}! Você venceu!`;
            resultMessageP.style.color = 'var(--color-primary)';
        } else {
            resultMessageP.textContent = `😢 Que pena! Caiu ${result}. Tente novamente!`;
            resultMessageP.style.color = '#d32f2f'; // Cor de erro/alerta
        }

        updateDisplay(); // Atualiza o contador de vitórias no display
        isAnimating = false; // Libera o clique do botão
    }, 600); // O tempo aqui deve corresponder à duração da transição da moeda
}

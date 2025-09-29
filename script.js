const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let board = document.getElementById("board");
let cardValues = [...cards, ...cards]; // Duplicando as cartas para fazer os pares
let flippedCards = [];
let matchedCards = [];

// Embaralha as cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
}

// Cria e exibe as cartas no tabuleiro
function createBoard() {
    shuffle(cardValues);
    board.innerHTML = ''; // Limpa o tabuleiro

    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', index);
        card.setAttribute('data-value', value);
        card.textContent = '?';
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

// Vira a carta ao ser clicada
function flipCard(event) {
    const clickedCard = event.target;
    if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped') && !matchedCards.includes(clickedCard)) {
        clickedCard.textContent = clickedCard.getAttribute('data-value');
        clickedCard.classList.add('flipped');
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Verifica se as duas cartas viradas são iguais
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-value') === card2.getAttribute('data-value')) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === cardValues.length) {
            setTimeout(() => alert('Você ganhou!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.textContent = '?';
            card2.textContent = '?';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Reinicia o jogo
document.getElementById('resetBtn').addEventListener('click', () => {
    cardValues = [...cards, ...cards];
    flippedCards = [];
    matchedCards = [];
    createBoard();
});

// Inicia o jogo
createBoard();

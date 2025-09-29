const gameBoard = document.getElementById('gameBoard');
let cards = [];
let flippedCards = [];
let matchedCards = 0;

// Definindo os pares de cartas 
const cardValues = ['🍎', '🍌', '🍇', '🍓', '🍉', '🍊', '🍍', '🍓'];
const allCards = [...cardValues, ...cardValues]; // Duplicando para formar os pares

// Função para embaralhar as cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Função para criar as cartas no tabuleiro
function createBoard() {
    shuffle(allCards);
    allCards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

// Função para virar a carta
function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Função para verificar se as cartas viradas são iguais
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards++;

        if (matchedCards === cardValues.length) {
            setTimeout(() => alert('Parabéns! Você venceu!'), 500);
        }

        flippedCards = [];
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Função para reiniciar o jogo
function resetGame() {
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedCards = 0;
    createBoard();
}

// Inicializando o jogo
createBoard();

let bjGame = {
    'you': { 'scoreSpan': '#myResult', 'div': '#mySection', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealerResult', 'div': '#dealerSection', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false
}
const you = bjGame['you'];
const dealer = bjGame['dealer'];

document.querySelector('.hit').addEventListener('click', bjHit);
document.querySelector('.stand').addEventListener('click', bjStand);
document.querySelector('.deal').addEventListener('click', bjDeal);

const hitSound = new Audio('./sounds/swish.m4a');
const lossSound = new Audio('./sounds/aww.mp3');
const winSound = new Audio('./sounds/cash.mp3');

function showCard(card, activePlayer) {
    if (activePlayer['score'] < 21) {
        let cardImg = document.createElement('img');
        cardImg.setAttribute('class', 'cards');
        cardImg.src = `./images/${card}.jpg`;
        document.querySelector(activePlayer['div']).appendChild(cardImg);
        hitSound.play();
    }
}

function randomCard() {
    let random = Math.floor(Math.random() * 13)
    return bjGame['cards'][random];
}
function bjHit() {
    if (bjGame['isStand'] == false) {
        let card = randomCard();
        showCard(card, you);
        updateScore(card, you);
        showScore(you);
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function bjStand() {
    bjGame['isStand'] = true;
    while (dealer['score'] < 16 && bjGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, dealer);
        updateScore(card, dealer);
        showScore(dealer);
        await sleep(650)
    }

    winner = computeWinner();
    showResult(winner)
    bjGame['turnsOver'] = true;

}

function bjDeal() {
    if (bjGame['turnsOver'] == true) {
        bjGame['isStand'] = false;
        let yourImages = document.querySelector('#mySection').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealerSection').querySelectorAll('img');

        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        you['score'] = 0;
        dealer['score'] = 0;

        document.querySelector('#myResult').textContent = 0;
        document.querySelector('#dealerResult').textContent = 0;

        document.querySelector('#myResult').style.color = 'white';
        document.querySelector('#dealerResult').style.color = 'white';

        document.querySelector('#message').textContent = `Let's play`;
        document.querySelector('#message').style.color = `black`;
        bjGame['turnsOver'] = false;
    }
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + bjGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += bjGame['cardsMap'][card][1]
        } else {
            activePlayer['score'] += bjGame['cardsMap'][card][0]
        }
    } else {
        activePlayer['score'] += bjGame['cardsMap'][card];
    }
}
function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }
}

function computeWinner() {
    let winner;
    if (you['score'] <= 21) {
        if (dealer['score'] > 21 || dealer['score'] < you['score']) {
            winner = you;
            bjGame['wins']++;
        } else if (dealer['score'] > you['score']) {
            winner = dealer;
            bjGame['losses']++;
        } else if (dealer['score'] === you['score']) {
            bjGame['draws']++;
        }
    } else if (you['score'] > 21 && dealer['score'] <= 21) {
        winner = dealer;
        bjGame['losses']++;
    } else if (you['score'] > 21 && dealer['score'] > 21) {
        bjGame['draws']++;
    }
    return winner;
}

function showResult(winner) {
    if (bjGame['turnsOver'] === false) {
        if (you === winner) {
            message = 'You won!';
            messageColor = 'green';
            winSound.play()
        } else if (dealer === winner) {
            message = 'You lost....';
            messageColor = 'red';
            messageSound = lossSound;
            lossSound.play()
        } else {
            message = 'You drew:)';
            messageColor = 'blue';
        }
        document.querySelector('#message').style.color = messageColor;
        document.querySelector('#message').textContent = message;

        document.querySelector('#wins').textContent = bjGame['wins'];
        document.querySelector('#draws').textContent = bjGame['draws'];
        document.querySelector('#losses').textContent = bjGame['losses'];
    }
}
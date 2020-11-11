let bjGame = {
    'you': { 'scoreSpan': '#myResult', 'div': '#mySection', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealerResult', 'div': '#dealerSection', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] }
}

const you = bjGame['you'];
const dealer = bjGame['dealer'];

document.querySelector('.hit').addEventListener('click', bjHit);
// document.querySelector('.stand').addEventListener('click', bjStand);
document.querySelector('.deal').addEventListener('click', bjDeal);

const hitSound = new Audio('./sounds/swish.m4a');

function showCard(card, activePlayer) {
    if (activePlayer['score'] < 21) {
        let cardImg = document.createElement('img');
        cardImg.setAttribute('class', 'cards');
        cardImg.src = `./images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImg);
    }
}

function randomCard() {
    let random = Math.floor(Math.random() * 13)
    return bjGame['cards'][random];
}

function bjDeal() {
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
}

function bjHit() {
    let card = randomCard();
    showCard(card, you);
    updateScore(card, you);
    showScore(you);
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
function rukyti() {
    let rukyci = Math.floor(Math.random() * 2 + 1)
    if (rukyci === 1) {
        console.log('yes');
    } else {
        console.log('no');
    }
}
rukyti()
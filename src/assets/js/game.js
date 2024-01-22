import { words } from './words';
import { alphabet } from './alphabet';
import { alphabetRu } from './alphabet';

const mainContainer = document.querySelector('.main_container');
const hint = document.querySelector('.hint');
const guesses = document.querySelector('.guesses');
const overlay = document.querySelector('.overlay');

export let currentWord = '';
let maxNumberOfGuesses = 6;
let countOfGuesses = 0;
const hangmanErrorColor = '#ff8256';
export let modalWindowText = '';
let numberOfOpenedLetters = 0;
// let previousWord = undefined;
const listener = (event) => {
    detectLetterByKeyBoard(event);
};

function getRandomWord() {
    const randomNumber = Math.floor(Math.random() * words.length);
    currentWord = words[randomNumber];
    console.log(currentWord);
    let previousWord = undefined;
    console.log(localStorage.getItem('previousWord'));
    if (localStorage.getItem('previousWord') !== undefined) {
        previousWord = localStorage.getItem('previousWord');
        if (previousWord === currentWord.word) {
            console.log('prvWordWaS');
            getRandomWord();
        }
    }
    localStorage.setItem('previousWord', currentWord.word);
}

function addListenertoKeyBoard() {
    document.addEventListener('keyup', listener);
}

function makeWordImageOfLetters() {
    const currentWordContainer = document.querySelector('.word');
    currentWordContainer.innerHTML = '';
    addListenertoKeyBoard();
    getRandomWord();
    const lengthOfWord = currentWord.word.length;
    hint.innerHTML = `<span>Hint</span>: ${currentWord.description}`;
    guesses.innerHTML = `<span>Incorrect guesses</span>:<span class="number_guesses"> ${countOfGuesses} / ${maxNumberOfGuesses}</span>`;
    for (let i = 0; i < lengthOfWord; i += 1) {
        const letterContainer = document.createElement('p');
        letterContainer.classList.add('letter_item');
        currentWordContainer.append(letterContainer);
    }
}
makeWordImageOfLetters();

function makeKeyBoardImageOfLetters() {
    const keyboardContainer = document.querySelector('.keyboard');
    keyboardContainer.innerHTML = '';
    for (let i = 0; i < alphabet.length; i += 1) {
        const letterContainer = document.createElement('p');
        letterContainer.classList.add('letter_keyboard');
        letterContainer.setAttribute('id', alphabetRu[i]);
        letterContainer.innerText = alphabet[i];
        keyboardContainer.append(letterContainer);
    }
    keyboardContainer.addEventListener('click', (event) => {
        detectLetter(event);
    });
}

makeKeyBoardImageOfLetters();

function detectLetter(event) {
    const targetLetter = event.target;
    if (!targetLetter.classList.contains('letter_keyboard')) {
        return;
    }

    let isLetterExistInWord = false;
    const currentLetter = targetLetter.innerText.toUpperCase();
    let isLetterWasUsed = isLetterUsed(currentLetter);
    if (isLetterWasUsed === true) {
        return;
    }
    isLetterExistInCurrentWord(currentLetter, isLetterExistInWord);
    targetLetter.classList.add('letter_keyboard_used');
}

function detectLetterByKeyBoard(event) {
    const targetLetter = event.key.toUpperCase();
    let isLetterExistInWord = false;
    let isCorrectSymbolOfletter = correctSymbolOfletter(targetLetter);
    if (isCorrectSymbolOfletter === false) {
        return;
    }
    let currentLetter = targetLetter;
    for (let i = 0; i < alphabetRu.length; i += 1) {
        if (currentLetter === alphabetRu[i]) {
            currentLetter = alphabet[i];
        }
    }

    let isLetterWasUsed = isLetterUsed(currentLetter);
    if (isLetterWasUsed === true) {
        return;
    }
    isLetterExistInCurrentWord(currentLetter, isLetterExistInWord);
    markKeyBoardLetterAsUsed(currentLetter);
}
function correctSymbolOfletter(targetLetter) {
    const keyboardLetter = document.querySelector('.keyboard').children;
    for (let i = 0; i < keyboardLetter.length; i += 1) {
        if (keyboardLetter[i].innerText === targetLetter || targetLetter === keyboardLetter[i].getAttribute('id')) {
            return true;
        }
    }
    return false;
}

function isLetterUsed(currentLetter) {
    const keyboardLetter = document.querySelector('.keyboard').children;
    for (let i = 0; i < keyboardLetter.length; i += 1) {
        if (keyboardLetter[i].innerText === currentLetter || currentLetter === keyboardLetter[i].getAttribute('id')) {
            if (keyboardLetter[i].classList.contains('letter_keyboard_used')) {
                return true;
            }
        }
    }
    return false;
}

function markKeyBoardLetterAsUsed(currentLetter) {
    const keyboardLetter = document.querySelector('.keyboard').children;
    for (let i = 0; i < keyboardLetter.length; i += 1) {
        if (keyboardLetter[i].innerText === currentLetter || currentLetter === keyboardLetter[i].getAttribute('id')) {
            keyboardLetter[i].classList.add('letter_keyboard_used');
        }
    }
}

function isLetterExistInCurrentWord(currentLetter, isLetterExistInWord) {
    const wordImageLetters = document.querySelector('.word').children;
    for (let i = 0; i < currentWord.word.length; i += 1) {
        if (currentLetter === currentWord.word[i].toUpperCase()) {
            wordImageLetters[i].innerText = currentLetter;
            isLetterExistInWord = true;
            numberOfOpenedLetters += 1;
        }
    }
    isMistake(isLetterExistInWord);
    if (countOfGuesses === 6) {
        modalWindowText = 'Sorry, but you loose!';
        const modalWindow = receiveModalWindow();
        overlay.style.display = 'block';
        mainContainer.insertAdjacentHTML('beforeend', modalWindow);
        addListenersToUserDesicisionButtons();
        document.removeEventListener('keyup', listener);
    }
    if (numberOfOpenedLetters === currentWord.word.length) {
        modalWindowText = 'Congratulations, you won!';
        const modalWindow = receiveModalWindow();
        overlay.style.display = 'block';
        mainContainer.insertAdjacentHTML('beforeend', modalWindow);
        addListenersToUserDesicisionButtons();
        document.removeEventListener('keyup', listener);
    }
}

function isMistake(isLetterExistInWord) {
    if (isLetterExistInWord === false) {
        countOfGuesses += 1;
        addHangmanPart();
    }
    const guesses = document.querySelector('.guesses');
    guesses.innerHTML = `<span>Incorrect guesses</span>:<span class="number_guesses"> ${countOfGuesses} / ${maxNumberOfGuesses}</span>`;
}

function addHangmanPart() {
    const head = document.getElementById('head');
    const body = document.getElementById('body');
    const leftHand = document.getElementById('hand-left');
    const rightHand = document.getElementById('hand-right');
    const leftLeg = document.getElementById('leg-left');
    const rightLeg = document.getElementById('leg-right');
    switch (countOfGuesses) {
        case 1:
            head.setAttribute('stroke', hangmanErrorColor);
            break;
        case 2:
            body.setAttribute('fill', hangmanErrorColor);
            break;
        case 3:
            leftHand.setAttribute('fill', hangmanErrorColor);
            break;
        case 4:
            rightHand.setAttribute('fill', hangmanErrorColor);
            break;
        case 5:
            leftLeg.setAttribute('fill', hangmanErrorColor);
            break;
        case 6:
            rightLeg.setAttribute('fill', hangmanErrorColor);
            break;
    }
}
function receiveModalWindow() {
    const modalWindow = `<div class="modal-window">
                           <p class="text-result">${modalWindowText}<p>
                           <p class="text-word">Word was <span>${currentWord.word}<span><p>
                           <p class="text-suggestion">Do you want to play again?</p>
                           <div class="text-decision">
                             <p class="text-button yes-text">Yes<p>
                           </div>
                         </div>`;
    return modalWindow;
}

function addListenersToUserDesicisionButtons() {
    // const noButton = document.querySelector('.no-text');
    const yesButton = document.querySelector('.yes-text');
    // noButton.addEventListener('click', (event) => {
    //     closeModalWindow(event);
    // });
    yesButton.addEventListener('click', (event) => {
        closeModalWindow(event);
    });
}

function closeModalWindow(event) {
    const targetButton = event.target;
    const modalWindow = document.querySelector('.modal-window');
    if (targetButton.classList.contains('no-text')) {
        modalWindow.remove();
        overlay.style.removeProperty('display');
    }
    if (targetButton.classList.contains('yes-text')) {
        modalWindow.remove();
        overlay.style.removeProperty('display');
        makeKeyBoardImageOfLetters();
        countOfGuesses = 0;
        modalWindowText = '';
        numberOfOpenedLetters = 0;
        makeWordImageOfLetters();
        const head = document.getElementById('head');
        const body = document.getElementById('body');
        const leftHand = document.getElementById('hand-left');
        const rightHand = document.getElementById('hand-right');
        const leftLeg = document.getElementById('leg-left');
        const rightLeg = document.getElementById('leg-right');
        head.setAttribute('stroke', 'white');
        body.setAttribute('fill', 'white');
        leftHand.setAttribute('fill', 'white');
        rightHand.setAttribute('fill', 'white');
        leftLeg.setAttribute('fill', 'white');
        rightLeg.setAttribute('fill', 'white');
    }
}

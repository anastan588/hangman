import { head } from '../icons/partsHangman';
import { body } from '../icons/partsHangman';
import { leftHand } from '../icons/partsHangman';
import { rightHand } from '../icons/partsHangman';
import { leftLeg } from '../icons/partsHangman';
import { rightLeg } from '../icons/partsHangman';

document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="main_container">
              <div class="overlay"></div>
              <header class="header">
                 <h1>Fruits Hangman</h1>
              </header>
              <main class="main">
                <section class="game">
                  <div class="hangman_block">
                     <img class="gallows" src="assets/icons/gallows.svg" alt="gallows"/>
                     <div class="hangman-image">
                        <div class="head hangman_item">${head}</div>
                        <div class="body-hands hangman_item">
                            <div class="hand-left">${leftHand}</div>
                            <div class="body">${body}</div>
                            <div class="hand-right">${rightHand}</div>
                        </div>
                        <div class="legs hangman_item">
                            <div class="leg-left">${leftLeg}</div>
                            <div class="leg-right">${rightLeg}</div>
                        </div>
                     </div>
                  </div>
                  <div class="words_block">
                    <div class="word"></div>
                    <div class="hint"></div>
                    <div class="guesses"></div>
                    <div class="keyboard"></div>
                  </div>
                 </section>
              </main>
              <footer class="footer">
                 <p class="footer_item">
                   anastan588
                 </p>
                 <p class="footer_item">
                   2024
                 </p>
                 <a class="footer_item github" href="https://github.com/anastan588" target="_blank">
                   Github
                 </a>
              </footer>
            </div>`
);

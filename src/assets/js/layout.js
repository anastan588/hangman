document.body.insertAdjacentHTML(
  "beforeend",
  `<div class="main_container>
              <header class="header">
                 <h1>Fruits Hangman</h1>
              </header>
              <main class="main">
                <section class="game">
                  <div class="hangman_block">
                     <img class="gallows" src="assets/icons/gallows.svg" alt="gallows"/>
                     <img class="head" src="assets/icons/head.svg" alt="head"/>
                     <img class="body" src="assets/icons/body.svg" alt="body"/>
                     <img class="hand-left" src="assets/icons/hand-one.svg" alt="hand-left"/>
                     <img class="hand-right" src="assets/icons/hand-two.svg" alt="hand-right"/>
                     <img class="leg-left" src="assets/icons/leg-one.svg" alt="leg-left"/>
                     <img class="leg-right" src="assets/icons/leg-two.svg" alt="leg-right"/>
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
                 <a class="footer_item">
                   anastan588
                 </a>
                 <p class="footer_item">
                   2024
                 </p>
                 <p class="footer_item">
                   Github
                 </p>
              </footer>
            </div>`,
);

console.log("hello");

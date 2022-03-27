let TIME_LIMIT = 60;
let Text_typed = ["Fires in the Arctic are spreading to",
"areas which were formerly fire-resistant.",
"The tundra north of the Arctic Circle is drying up ",
"and vegetation there like moss, grass, dwarf shrubs, etc",
"are starting to catch fire",
"The fires and record temperatures have the potential of turning",
"the carbon sink into a carbon source and increasing global warming.",
"There is an urgent need to understand the nature of fires in the Arctic",
"which are evolving and changing rapidly.",
"Fires in the Arctic are spreading to areas which were formerly fire-resistant.",
"The issue needs to be taken up as an issue of global importance.",
"There is a need for global cooperation, investment and action in monitoring fires."
];
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");
 
let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
    quote_text.textContent = null;
    current_quote = Text_typed[quoteNo];
     // split each character in the text into a series of span elements. 
     // By doing this we can individually change the colour of each character depending
     // if it was typed correctly 
    // separate each character and make an element
    // out of each of them to individually style them
    // each element is appended to quote_text
    current_quote.split('').forEach(char => {
      const charSpan = document.createElement('span')
      charSpan.innerText = char 
      quote_text.appendChild(charSpan)
    })
   
    // roll over to the first quote
    if (quoteNo < Text_typed.length - 1)
      quoteNo++;
    else
      quoteNo = 0;
  }


  // Getting the currently typed text by the user
  // After getting the input, this is also split into characters to compare with the text
  function processCurrentText() {
 
    // get current input text and split it
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');
   
    // increment total characters typed
    characterTyped++;
   
    errors = 0;
   
    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
      let typedChar = curr_input_array[index]
   
      // character not currently typed
      if (typedChar == null) {
        char.classList.remove('correct_char');
        char.classList.remove('incorrect_char');
   
        // correct character
      } else if (typedChar === char.innerText) {
        char.classList.add('correct_char');
        char.classList.remove('incorrect_char');
   
        // incorrect character
      } else {
        char.classList.add('incorrect_char');
        char.classList.remove('correct_char');
   
        // increment number of errors
        errors++;
      }
    });
   
    // display the number of errors
    error_text.textContent = total_errors + errors;
   
    // update accuracy text
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);
   
    // if current text is completely typed
    // irrespective of errors
    if (curr_input.length == current_quote.length) {
      updateQuote();
   
      // update total errors
      total_errors += errors;
   
      // clear the input area
      input_area.value = "";
    }
  }


  function startGame() {
 
    resetValues();
    updateQuote();
   
    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  }
   
  function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;
   
    input_area.value = "";
    Text_typed.textContent = 'Click on the area below to start the typing test';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
  }



  function updateTimer() {
    if (timeLeft > 0) {
      // decrease the current time left
      timeLeft--;
   
      // increase the time elapsed
      timeElapsed++;
   
      // update the timer text
      timer_text.textContent = timeLeft + "s";
    }
    else {
      // finish the game
      finishGame();
    }
  }

  function finishGame() {
    // stop the timer
    clearInterval(timer);
   
    // disable the input area
    input_area.disabled = true;
   
    // show finishing text
    quote_text.textContent = "Click on restart to start a new typing test.";
   
    // display restart button
    restart_btn.style.display = "block";
   
    // calculate cpm and wpm
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
   
    // update cpm and wpm text
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;
   
    // display the cpm and wpm
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
  }
  
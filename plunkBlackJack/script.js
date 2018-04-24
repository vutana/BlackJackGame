// Code goes here


let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten',
             'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two']; 

//DOM -Document Object Model
let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

//Game Variables
let gameStarted = false, //Boolean value
    gameOver = false,
    playerWon = false,
    dealerCards = [],  //array of cards
    playerCards = [],
    dealerScore = 0,  //keeps track of dealer and player scores
    playerScore = 0,
    deck = [];

hitButton.style.display = 'none';         //Hides the HIT button  
stayButton.style.display = 'none';        //Hides the STAY button
showStatus();

newGameButton.addEventListener('click', function() {
  gameStarted = true;                   //sets the game to true
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck); // we call the function here and pass it the deck
  dealerCards = [ getNextCard(), getNextCard() ];
  playerCards = [ getNextCard(), getNextCard() ];
  
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
});

hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
})

function createDeck(){ //Creates a deck of cards
  let deck = [];
  for ( let suitIndex = 0; suitIndex < suits.length; suitIndex++){
    for ( let valueIndex = 0; valueIndex < values.length; valueIndex++){
        let card = {                     //Create a card object, use curly braces to denote the object
             suit: suits[suitIndex],    //Create a suit property - object
            value: values[valueIndex] //We need a value property - object
        };                                
            deck.push( card );       // We need to push that card onto the deck
      }
  }
  return deck;
}

function shuffleDeck(deck){
  for (let i = 0; i < deck.length; i++){
    let swapIndex = Math.trunc(Math.random() * deck.length); //Take first card of the deck
    let tmp = deck[swapIndex];                               // Swap card with other random card
    deck[swapIndex] = deck[i];           //We are swapping deck-i- with SwapIndex
    deck[i] = tmp;                       //That's how we shuffle the deck
  }
}
function getCardString(card){              //create the function getCardString and pass it card
  return card.value + ' of ' + card.suit; //return card value and suit
}                                        // Create a function to print out the card.

function getCardNumericValue(card){
  switch(card.value){
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
     case 'Four':
      return 4;
     case 'Five':
      return 5;
     case 'Six':
      return 6;
     case 'Seven':
      return 7;
     case 'Eight':
      return 8;
     case 'Nine':
      return 9; 
     default:
      return 10;
  }
  
}
function getScore(cardArray){
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++){//Loop through all the cards
    let card = cardArray[i];                // As long as -i- is less than cardArray-length
    score += getCardNumericValue(card);    //We execute this block of code
    if (card.value === 'Ace') {
       hasAce = true;                //Before we return the score we check if hasAce is true
    }                            //If the score is less or equal to 10 or 21 we keep going
  }
  if (hasAce && score + 10 <= 21){
    return score + 10;
  }
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame(){
  
  updateScores();
  
  if(gameOver) {
    //let dealer take cards
    while(dealerScore < playerScore
      && playerScore <= 21
      && playerScore <= 21) {
        dealerCards.push(getNextCard());
        updateScores();
      }
  }
  
  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21){
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver){
    if (playerScore > dealerScore){
      playerWon = true;
    }
    else {
      playerWon = false;
    }
 
  }
}
function showStatus(){
  if (!gameStarted){
    textArea.innerText = 'Welcome to BlackJack';
    return;
  }
  
  let dealerCardString = '';
  for (let i=0; i < dealerCards.length; i++){  //For each card we append the string value of the card
    dealerCardString +=getCardString(dealerCards[i]) + '\n';// we skip to the next line
  }
  let playerCardString = '';
  for (let i=0; i < playerCards.length; i++){
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();
  
  textArea.innerText =
  'Dealer has:\n' +
  dealerCardString +
  '(score: '+ dealerScore + ')\n\n' +
  
  'Player has:\n' +
  playerCardString +
  '(score: '+ playerScore + ')\n\n';
  
  if (gameOver){
    if(playerWon){
      textArea.innerText += "Winner Winner Chicken Dinner!!! You win!!!";
    }
    else {
      textArea.innerText += "DEALER WINS...You lose!!!";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    
  }
  
}
function getNextCard(){
  return deck.shift();
}
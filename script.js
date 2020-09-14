//Challenge 1: Your age in Days

function age(){
  var birthYear = prompt("Year of your birth");
  var ageInDays = (2020-birthYear)*365;
  var h1 = document.createElement('h1');
  var textAns =  document.createTextNode('You are '+ageInDays+' old');
  h1.setAttribute('id','ageInDays');
  h1.appendChild(textAns);
  document.getElementById('flex-box-result').appendChild(h1);
  console.log(ageInDays);
}
function reset(){
  document.getElementById('ageInDays').remove();
}

//Challenge 2: Generate Cat

function generateCat(){
  var image=document.createElement('img');
  var div=document.getElementById('flex-cat-generator');
  image.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
}

//Challenge 3: Rock paper scissor game

function rpsGame(yourChoice){
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice=numberToChoice(randomToInt());
  results=decideWinner(humanChoice, botChoice);//[0, 1]human lost and bot won
  message=finalMessage(results);//"you won"
  rpsFrontEnd(yourChoice.id, botChoice, message)
}

function randomToInt() {
  return Math.floor(Math.random()*3);
}

function numberToChoice(number) {
  return ['rock','paper','scissor'][number];
}

function decideWinner(yourChoice, compChoice) {
    var data={
      'rock':{'scissor':1,'rock':0.5,'paper':0},
      'paper':{'rock':1,'paper':0.5,'scissor':0},
      'scissor':{'paper':1,'scissor':0.5,'rock':0},
    }
    var yourScore = data[yourChoice][compChoice];
    var compScore = data[compChoice][yourChoice];

    return [yourScore, compScore];
}
function finalMessage([yourScore,compScore]) {
  if (yourScore===0) {
    return {'message':'You lost!','color':'red'};
  }
  else if (yourScore===0.5) {
    return {'message':'You tied!','color':'yellow'}
  }
  else {
    return {'message':'You win!','color':'green'};
  }
}
function rpsFrontEnd(humanImage, botImage, finalMessage) {
  var imageData={
    'rock':document.getElementById('rock').src,
    'paper':document.getElementById('paper').src,
    'scissor':document.getElementById('scissor').src
  }
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissor').remove();

  var humanDiv=document.createElement('div');
  var botDiv=document.createElement('div');
  var messageDiv=document.createElement('div');

  humanDiv.innerHTML="<img src='"+imageData[humanImage]+"'height='150' width='150' style='box-shadow:0px 10px 50px rgba(37,50,233,1);'>";
  messageDiv.innerHTML="<h1 style='color:"+finalMessage['color']+";font-size:60px; padding: 30px;'>"+finalMessage['message']+"</h1>";
  console.log(messageDiv.innerHTML);
  console.log(finalMessage['color']);
  console.log(finalMessage['message']);
  botDiv.innerHTML="<img src='"+imageData[botImage]+"'height='150' width='150' style='box-shadow:0px 10px 50px rgba(234,50,24,1);'>";

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//Challenge 4:change color of all the buttons

var all_buttons=document.getElementsByTagName('button');
console.log(all_buttons);

var copyAllButtons=[];
for (var i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColor(buttonButton) {
    if (buttonButton.value==='red') {
      buttonsRed();
    }
    else if (buttonButton.value==='green') {
      buttonsGreen();
    }
    else if (buttonButton.value==='reset') {
      buttonsReset();
    }
    else if (buttonButton.value==='random') {
      randomColors();
    }
}

function buttonsRed() {
  for (var i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
  }
}

function buttonsGreen() {
  for (var i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}

function buttonsReset() {
  for (var i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  var choices=["btn-primary", "btn-danger", "btn-success", "btn-primary", "btn-danger", "btn-warning", "btn-success"];
  for (var i = 0; i < all_buttons.length; i++) {
    var randomNumber=Math.floor(Math.random()*4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }

}

//Challenge 5: Blackjack game

let blackjackGame={
  'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
  'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
  'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
  'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
  'wins':0,
  'losses':0,
  'draws':0,
  'isStand':false,
  'turnsOver':false,
};
const YOU=blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound=new Audio('/sounds/swish.m4a');
const winSound=new Audio('/sounds/cash.mp3');
const lostSound=new Audio('/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

function blackjackHit() {
  if(blackjackGame['isStand']===false){
    let card = randomCard();
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
    console.log(YOU['score']);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic() {
  blackjackGame['isStand']=true;
  while (DEALER['score']<16 && blackjackGame['isStand']===true)
  {
    let card=randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

    blackjackGame['turnsOver']=true;
    showWinner(computeWinner());
}

function showCard(card,activePlayer) {
  if(activePlayer['score']<=21){
    let cardImage=document.createElement('img');
    cardImage.src=`/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if(blackjackGame['turnsOver']===true){

    blackjackGame['isStand']=false;

    let yourImages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');

    for (var i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }

    for (var i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#your-blackjack-result').style.color='white';

    document.querySelector('#blackjack-result').textContent="Let's Play";
    document.querySelector('#blackjack-result').style.color="black";

    document.querySelector('#dealer-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').style.color='white';

    blackjackGame['turnsOver']=true;
  }
}

function randomCard() {
  let randomIndex=Math.floor(Math.random()*13);
  return blackjackGame['cards'][randomIndex];
}

function updateScore(card,activePlayer){
  if (card==='A') {
    if (activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21) {
      activePlayer['score']+=blackjackGame['cardsMap'][card][1];
    }
    else {
      activePlayer['score']+=blackjackGame['cardsMap'][card][0];
    }
  }
  else {
    activePlayer['score']+=blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer){
  if (activePlayer['score']>21) {
    document.querySelector(activePlayer['scoreSpan']).textContent="BUST";
    document.querySelector(activePlayer['scoreSpan']).style.color="red";
  }
  else{
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
  }
}

function computeWinner() {
  let winner;
  if (YOU['score']<=21) {
    if ((YOU['score']>DEALER['score'])||(DEALER['score']>21)) {
      blackjackGame['wins']++;
      winner=YOU;
    }
    else if (YOU['score']<DEALER['score']) {
      blackjackGame['losses']++;
      winner=DEALER;
    }
    else if (YOU['score']===DEALER['score']) {
      blackjackGame['draws']++;
    }
  }
  else if ((YOU['score']>21) && (DEALER['score']<=21)) {
    blackjackGame['losses']++;
    winner=DEALER;
  }
  else if ((YOU['score']>21) && (DEALER['score']>21)) {
    blackjackGame['draws']++;
  }
  console.log(blackjackGame);
  return winner;
}

function showWinner(winner) {
  let message, messageColor;

  if(blackjackGame['turnsOver']===true){
    if (winner===YOU) {
      document.querySelector('#wins').textContent=blackjackGame['wins'];
      message="You won!";
      messageColor="green";
      winSound.play();
    }
    else if (winner===DEALER) {
      document.querySelector('#losses').textContent=blackjackGame['losses'];
      message="You lost!";
      messageColor="red";
      lostSound.play();
    }
    else {
      document.querySelector('#draws').textContent=blackjackGame['draws'];
      message="You drew";
      messageColor="black";
    }

    document.querySelector('#blackjack-result').textContent=message;
    document.querySelector('#blackjack-result').style.color=messageColor;
  }
}

//js script
window.onload  = function(){

var computer = false;
var game = "notStarted"; //to  block the button to chose the player X or O
var turn = 0;
var usedSquare = []; // make the square unavailable for a second click
var player1, player2;
var movePlayer1 = [];
var movePlayer2 = [];
var score1 = 0;
var score2 = 0;
var winGame = false;


//setupscore score
document.getElementById('score1').innerHTML = score1;
document.getElementById('score2').innerHTML = score2;

var computerButton = document.getElementById('computer');
computerButton.addEventListener("click", function(){
  computer = true;
})

var tiles = Array.prototype.slice.call(document.getElementsByClassName('tiles'));
tiles.forEach(function(e){
  e.onclick = function(){
    tile = this.value;

    chosePlayer();
    }
})



function chosePlayer(){
  console.log('game', game, "tiles", tiles);
  if (game === "notStarted"){
    if (tile === "X"){
      console.log("x has been clicked");
        player1 = '<i class="fa fa-times fa-4x" aria-hidden="true"></i>'; //"X"
        player2 = '<i class="fa fa-circle-o fa-4x" aria-hidden="true"></i>'; //"O"

      }else {
        player1 = '<i class="fa fa-circle-o fa-4x" aria-hidden="true"></i>'; //"O"
        player2 = '<i class="fa fa-times fa-4x" aria-hidden="true"></i>'; //"X"
      }
      game = "started"

  }
} // end of chosePlayer




// read the id of the square
var squares = Array.prototype.slice.call(document.getElementsByClassName("square"));
squares.forEach(function(item){
  item.onclick = function(){
    id = this.id;
    status = this.dataset.status;
    //call the game
      playGame();
  }
})

//calling the game depending on different game play
function playGame(){
  if(computer === true){
    playGameComputer();
  }else{
    playGameFriends();
  }
}

//play game vs friend and play game vs computer
function playGameComputer(){
if(game === 'started'){
  if (!usedSquare.includes(id)){
    if(turn%2 === 0) {
            document.getElementById(id).innerHTML = player1 ;
            addMove(id, movePlayer1);
            console.log('from game player 1', movePlayer1);
            checkwin(movePlayer1);
            usedSquare.push(id);
            if (winGame === true){
                score1 ++;
                document.getElementById('score1').innerHTML = score1
                }
            else {
              computerMove();

              console.log('from game player 2', movePlayer2);
              checkwin(movePlayer2);
             if (winGame === true){
                score2 ++;
                document.getElementById('score2').innerHTML = score2
              }
            }
    }//end of if(turn%2 === 0
      turn++;
      playAgain();
      callingResetSetUp();
    }
  }
}//end of playgame computer

//helper function  manage the gameplay 2 human palyers
function playGameFriends(){
  if(game === 'started'){
    if (!usedSquare.includes(id)){
      if(turn%2 === 0 ){
          document.getElementById(id).innerHTML = player1;
          addMove(id, movePlayer1);
          checkwin(movePlayer1);
          if (winGame === true){
              score1 ++;
              document.getElementById('score1').innerHTML = score1
              }
        }else {
          document.getElementById(id).innerHTML = player2;
          addMove(id, movePlayer2);
          checkwin(movePlayer2);
           if (winGame === true){
              score2 ++;
              document.getElementById('score2').innerHTML = score2
              }
      }//end of else
      usedSquare.push(id);
      turn++;
      playAgain();
      callingResetSetUp();
    }
  }
}//end of playGame


//collect players move
function addMove(move, arrPlayer){
  arrPlayer.push(move)
}

//check for winnig combination
var winArr = [
['r1c1', 'r1c2', 'r1c3'],
['r2c1', 'r2c2', 'r2c3'],
['r3c1', 'r3c2', 'r3c3'],
['r1c1', 'r2c1', 'r3c1'],
['r1c2', 'r2c2', 'r3c2'],
['r1c3', 'r2c3', 'r3c3'],
['r1c1', 'r2c2', 'r3c3'],
['r3c1', 'r2c2', 'r1c3']
];


function checkwin(playerMoves){
// Check if each subarray has all the elements.
// Will return a boolean for each subarray.
  var arrayOfWins = winArr.map(function(subArray) {
    return subArray.every(function(element) {
      return playerMoves.indexOf(element) > -1;
    });
  });

// Check if there is a true in arrayOfWins.
  if (arrayOfWins.indexOf(true) > -1) {
    winGame = true;
    }
}//end of check win





var squaresId = [];

function addId(){
  for(var i=0; i<squares.length; i++){
      squaresId.push(squares[i].id)
  }
}
addId();

function computerMove(){
  var avail = squaresId.filter(function(el){
    return this.indexOf(el) < 0;
  }, usedSquare);

  if( avail.length != 0){
    rand = avail[Math.floor(Math.random() * avail.length)];
    document.getElementById(rand).innerHTML = player2 ;
    addMove(rand, movePlayer2);
    usedSquare.push(rand);
  }
}//end of computerMove

function playAgain(){
  var newPlay = document.getElementById("playAgain");
  newPlay.addEventListener("click", function(){
    resetPlay();
  });
}

// calling reset set up

function callingResetSetUp(){
  var reset = document.getElementById('reset');
  reset.addEventListener('click', function(){
      resetSetUp();
  });
}

//reset play, reset square to blank, do not modify set up or score

function resetPlay(){

  usedSquare.forEach(function(item){
    document.getElementById(item).innerHTML = '';
  });
    usedSquare = [];
    movePlayer1 = [];
    movePlayer2 = [];
    turn = 0;
    winGame = false;

} //end of resetPlay

//reset play, reset square to blank, modify set up or score
function resetSetUp(){
  usedSquare.forEach(function(item){
    document.getElementById(item).innerHTML = '';
  });

    computer = false;
    game = "notStarted"; //to  block the button to chose the player X or O
    usedSquare = []; // make the square unavailable for a second click
    movePlayer1 = [];
    movePlayer2 = [];
    turn = 0;
    score1 = 0;
    score2 = 0;
    winGame = false;
    document.getElementById('score1').innerHTML = score1;
    document.getElementById('score2').innerHTML = score2;
} //end of resetSetUp */


}//end of window.onload






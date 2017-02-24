//initialize rows
var rows = 3;
var columns = 3;
var gameData = [];
var player1 = {
  playerName:"souwei",
  playerScore:0,
  wins:0
};
var player2 = {
  playerName:"souwei2",
  playerScore:0,
  wins:0
}
var players = [player1,player2];
var playerTurn = 0;
var gameRound = 1;

var initGameBoard = function(){
  var gamePieceNum = 0 ;
  for(var rowCounter = 0 ; rowCounter < rows ; rowCounter++){
    var columnData = [] ;
    for(var columnCounter = 0 ; columnCounter < columns ; columnCounter++){
      //save coordinates and owner of piece to each element
      var gamePieceData = {
        owner:"none",
        rowNum:rowCounter,
        columnNum:columnCounter,
        scoreValue:Math.pow(2,gamePieceNum)
      };
      columnData.push(gamePieceData);
      gamePieceNum++;
    }
    gameData.push(columnData);
  }
}

//player function to take ownership of piece
var maxMoves = rows * columns;
var currentMoves = 0
var setPlayerPiece = function (playerIdentity,rowNum,columnNum){
  if(gameData[rowNum][columnNum].owner==="none"){
    gameData[rowNum][columnNum].owner=playerIdentity.playerName;
    playerIdentity.playerScore += gameData[rowNum][columnNum].scoreValue;
    currentMoves++;
  }else{
    //Illegal move
    return false;
  }
  if(checkPlayerVictory(playerIdentity)){

    console.log(playerIdentity.playerName+ " has won!");
    playerIdentity.wins+=1;
    gameRound += 1;
    //gameReset();
  }else{
    if(gameOver()){
      console.log("Draw");
      gameRound += 1;
      //gameReset();
    }
  }

    return true;
};

var winningCombosScores = [7, 56, 448, 73, 146, 292, 273, 84];

var checkPlayerVictory = function(playerIdentity){
  var currentPlayerScore = playerIdentity.playerScore;
     for (var i = 0; i < winningCombosScores.length; i += 1) {
          if ((winningCombosScores[i] & currentPlayerScore) === winningCombosScores[i] ) {
              return true;
          }
      }
      return false;
};

var gameOver = function(){
  if(currentMoves===maxMoves){
    return true;
  }else{
    return false;
  }
};

var gameMove = function(y,x){
  return setPlayerPiece(players[playerTurn],y,x);
};

var gameReset = function(){
  //reset score counter
  players.forEach(function(player){
    player.playerScore=0;
  });
  currentMoves=0;
  gameData = [];
};

var gameBoard = document.querySelector(".game-board");
var gameMessages = document.querySelector(".game-messages");
var messageContent = gameMessages.querySelector("p");

var drawGameBoard = function(){
  for(var count = 0 ; count < gameData.length ; count++){
    for(var counter = 0 ; counter < gameData[count].length ; counter++){
      var gamePiece = document.createElement('div');
      gamePiece.className = "game-piece";
      gamePiece.setAttribute('data-column',counter);
      gamePiece.setAttribute('data-row',count);
      gameBoard.appendChild(gamePiece);
    }
  }

  gameBoard.addEventListener("click",function(event){
      if(event.target.className === "game-piece"){
        var x = event.target.getAttribute('data-column');
        var y = event.target.getAttribute('data-row');
        if(gameMove(y,x)){
          event.target.classList.add(players[playerTurn].playerName);
          messageContent.innerHTML="";

          if(checkPlayerVictory(players[playerTurn])){
          var displayMessage = " \" Victor: Player " + (playerTurn+1) + " \" ";
          messageContent.innerHTML="";
          showText(messageContent, displayMessage, 0, 50);
          //issue with displaying winning message
          setVictoryFlag(playerTurn);
          changeActivePlayerAvatar();
          updateScoreBoard();

          }else if(gameOver()){
          showText(messageContent," \" Draw Game\" ",0,20);
          changeActivePlayerAvatar();
          changePlayerTurn();
          }else
          changePlayerTurn();

          setTimeout(showText(messageContent," \" Player "+ (playerTurn+1) +"'s Turn... \" ",0,20), 10000);
          changeActivePlayerAvatar();
        }
      }
    });
    //1st turn message prompt
    changeActivePlayerAvatar();
    messageContent.innerHTML="";
    showText(messageContent,"\" Player "+ (playerTurn+1) +"'s Turn... \" ",0,50);
};

var removeGameBoard = function(){
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
  }
  gameReset();
};

var resetRounds = function(){
  gameRound = 1;

};

var retrieveGameRound = function(){
  return gameRound;
};

var resetPlayerWins = function(){
  //reset player wins
  players.forEach(function(player){
    player.wins=0;
  });
};

var changePlayerTurn = function(){
    playerTurn = (playerTurn == 0 ? 1 : 0);
};

//Start button to begin game
var startButton = document.querySelector("button");
var startStop = 1;
startButton.addEventListener("click",function(){
  removeGameBoard();
  initGameBoard();
  drawGameBoard();
  $( ".playerPanel").hide();
  showPlayerPanel();
  hideVictoryFlag();

});

//Print messages to game messages area
var showText = function (target, message, index, interval) {
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
}
showText(messageContent," \" Press start to begin.... \" ",0,50)

var changeActivePlayerAvatar = function(){
  var avatarImage = document.querySelector(".game-message-interactive img");
  switch(playerTurn){
    case 0:
    avatarImage.src="images/choco_animate.gif";
    break;
    case 1:
    avatarImage.src="images/cactuar_animate.gif";
    break;
  }
};

var updateScoreBoard = function(){
  var player1Pane = document.querySelector(".playerPotrait1");
  var player1winScore = player1Pane.querySelector("h4");
  player1winScore.innerHTML = "Wins: "+ players[0].wins;
  var player2Pane = document.querySelector(".playerPotrait2");
  var player2winScore = player2Pane.querySelector("h4");
  player2winScore.innerHTML = "Wins: "+ players[1].wins;
};

//Hide player panel
$( ".playerPanel").hide();
var showPlayerPanel = function(){
    $( ".playerPanel" ).show( "blind" );
};

var setVictoryFlag = function(playerNum){
  var x = document.querySelectorAll(".victoryFlag");
  var imageX = x[playerNum].querySelector("img");
  imageX.style.visibility="visible";
};

var hideVictoryFlag = function(){
  var x = document.querySelectorAll(".victoryFlag");
  var image1 = x[0].querySelector("img");
  var image2 = x[1].querySelector("img");
  image1.style.visibility="hidden";
  image2.style.visibility="hidden";
};

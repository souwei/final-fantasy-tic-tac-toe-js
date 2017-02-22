//initialize rows
var rows = 3;
var columns = 3;
var gameData = [];
var player1 = {
  playerName:"souwei",
  playerScore:0
};
var player2 = {
  playerName:"souwei2",
  playerScore:0
}
var players = [player1,player2];
var playerTurn = 0;

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
    //gameReset();
  }else{
    if(gameOver()){
      console.log("Draw");
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
  //alternate turns between player 1 and 2
  playerTurn = (playerTurn == 0 ? 1 : 0);
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
          showText(messageContent," \" Victor: Player " + (playerTurn+1) + " \" ",0,50);
          changeActivePlayerAvatar();
          }else if(gameOver()){
          showText(messageContent," \" Draw Game\" ",0,50);
          changeActivePlayerAvatar();
          }else
          showText(messageContent," \" Player "+ (playerTurn+1) +"'s Turn... \" ",0,50);
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

//Start button to begin game
var startButton = document.querySelector("button");
var startStop = 1;
startButton.addEventListener("click",function(){
  removeGameBoard();
  initGameBoard();
  drawGameBoard();

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
    avatarImage.src="images/chocobo_avatar.jpg";
    break;
    case 1:
    avatarImage.src="images/cactuar_avatar.jpg";
    break;
  }
};

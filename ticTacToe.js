//initialize rows
var rows = 3;
var columns = 3;
var gameData = [];
var player1 = {
  playerName:"souwei",
  playerScore:0.
  wins:0
};
var player2 = {
  playerName:"souwei2",
  playerScore:0.
  wins:0
}
var players = [player1,player2];
var playerTurn = 1;
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

var gameMove = function(players){
  //alternate turns between player 1 and 2
  playerTurn = (playerTurn == 0 ? 1 : 0);
  setPlayerPiece(players[playerTurn],rowNum,columnNum);
};

var gameReset = function(){
  //reset score counter
  players.forEach(function(player){
    player.playerScore=0;
  });
  currentMoves=0;
  gameData = [];
  initGameBoard();
};

var resetRounds = function(){
  gameRound = 1;
};

var retrieveGameRound = function(){
  return gameRound;
}


initGameBoard();

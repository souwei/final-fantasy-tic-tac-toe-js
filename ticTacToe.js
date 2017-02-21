//initialize rows
var rows = 3;
var columns = 3;
var gameData = [];
var player1 = {
  playerName:"souwei",
  playerScore:0
};

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

//player function to take ownership
var setPlayerPiece = function (playerIdentity,rowNum,columnNum){
  if(gameData[rowNum][columnNum].owner==="none"){
    gameData[rowNum][columnNum].owner=playerIdentity.name;
  }else{
    console.log("Piece already taken by "+gameData[rowNum][columnNum].owner);
  }
}

var winningCombosScores = [7, 56, 448, 73, 146, 292, 273, 84];
var getPlayerScore = function(playerIdentity){
  var column1 = [0];
  var column2 = [0];
  var column3 = [0];

  //Check for row victories
  gameData.forEach(function(row){
    var currentRowScore=0;
    row.forEach(function(element,index){
      if(element.owner===playerIdentity.name){
        currentRowScore += element.scoreValue;
        switch(index){
          case 0:
          column1.push(element.scoreValue);
          break;
          case 1:
          column2.push(element.scoreValue);
          break;
          case 2:
          column3.push(element.scoreValue);
          break;
        }
      }
    });
    if(winningCombosScores.includes(currentRowScore)){
      console.log("Victory for " + playerIdentity.name);
    }

  });
  var columnScores = [column1,column2,column3];
  //reduce array elements into single variable
  columnScores.forEach(function(element){
    element.reduce(function(acc,val){
      return acc + val;
    });
  });
  console.log(columnScores);

  //check for diagonal victories

}

initGameBoard();

##Game Plan##
I first visualize the game and tried to focus on finishing game without considering the GUI interface.
I broke it down into different components and wrote down some basic ideas on how to implement them. 
  
  1. `GAME BOARD`:Create an array of arrays  
  2. `GAME PIECES`:Create an object of game piece with properties such as "owner" of piece  
  3. `ACTION`:Select a piece of the object element in the array of arrays and take "ownership"  
  4. `GAME RULES AND CONSTRAINTS`: alternating players , 3 connected pieces determines winner, diagonal, across and vertical  
  5. `GAME SEQUENCE`: player makes a move based on game rules, moves game pieces on board and game rules determines the winner.  
 
##Inspiration and Ideas
The theme that i have decided to incorporate into my game is the 'final fantasy' theme which is one of my favourite RPG games.
Whilst researching for content and design elements from final fantasy and building the tic tac toe board, i realized there was a card game
in final fantasy which also used a 3 x 3 board. I decided that i wanted to make that game in the future after this project and
want to be able to re-use code from this project mainly the game board component. from that moment onwards making the code and components
re-usable for another game or presentation was my main coding style for the project.  
##Technologies used  
A combination of Javascript and DOM manipulation, some jquery to select elements and effects  
##Strategy  
###Guidelines followed###
1. Code with reusability in mind , try to keep presentation and mechanic logic separate as much as possible
2. Keep Functins to single responsibilty , if it is doing something else then make a function for it
3. Break down problems into smaller ones e.g. when trying to achieve a task with multiple constraints, reduce it to 1 easy constraint first and go from there. e.g. instead of figuring out how to stop another player from making a moveon a "taken tile, just figure out how to "take" the tile first.
4. Write and complete base template first, then write other features as Add-Ons.  
` create **game engine back bone** --> combine other **additional features**(win scores, game round) `   
` create **visual back bone** --> **combine** with game engine --> complete desired **visual requirements** `
5. Experiment with single elements and achieve tasks manually first to understand the fundamental behind it instead of
trying to use a fancy advance function right in the beginning.  
  
###Approach
1. Create 3 x 3 dimension boards, assign elements to each "tile" on board, each element is an object containing two key properties:
'owner' and 'scoreValue'. Owner is used to indicate if tile has been taken by a user and scoreValue is assigned values using base2 system, where each column is assigned a value of 2 ^ n where n starts with 0 to the number of elements to be created. This system allows for uniqueness of scorevalue for each tile and will be used to checking of winner in binary.
2.  When player makes a move, obtain the player name and coordinates of the action (x,y) or rowsNum and columnNum, if tile 'owner' property is a non-player name value, take ownership of the tile by changing its 'owner' value to player's name. otherwise DO not allow move amd nothing happens. At each successive move, increase playerScore by the scoreValue of tile. 
3. After each successive move , check for winner, algorithm used is to create an array of winning combo scores which is calculated by adding the scores of all the tiles in the winning directions in all columns and arrows incld. diagonal. do a bitwise operator between the user's tallied current score and the score combos recorded(one score combo at a time) , compare the output to the current combo to check if the player has achieved such winning combo, if successful, declare player as winner.  
4. Game ends

##Lessons Learnt  
* Try to make functions return True or False, this will allow greater flexibility for additional features or components
without needing to repeat code.
e.g. DOM manipulation 
* It is sometimes not possible to completely separate presentation and mechanics code, 
i learnt the rules and context of the problem, also how my code solves the problem  will also determine how i will need to be flexible and sometimes mix domains together.
* Taking advantage of binary and bitwise operator & when appropriate can be a very powerful way to solve problems.  
* CSS and Visual effects on HTMl page is difficult. 
*  JavaScript is tricky (closures and intervals)

##Unsolved Problems
*  Victory message overlapping with player turn message  

##Future Additions
* Make Cards Flip on Entrance
* Modify and change game to tripple triad card game

##Game link
https://souwei.github.io/ticTac_Toe/index.html

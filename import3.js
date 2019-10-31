module.exports = {
	dice: function () {
		return Math.floor(Math.random() * 6) + 1  
	},
	
	gameLogic: function (game, playerId, pos, chipsToMove) {
	
        console.log("Player " + game.playerTurn + " clicked " + pos);
    
		if (game.status != 1 || game.isProcessing || game.players[game.playerTurn].playerId != playerId) return false;
		
		var returnValue = 0;

		game.isProcessing = true;
		
		resetIdleTimeout(game);
		
		if (game.waitingForMove) {
			var chipsOnPos = [];
			for (var i = 0;i < 4;i++) {
				if (game.players[game.playerTurn].chips[i].pos == pos) chipsOnPos.push(i);
			}
			
			if (chipsOnPos.length > 0) {
				var chipLength = game.players[game.playerTurn].chips[chipsOnPos[0]].distance;
				for (var i = 0; i < chipsToMove;i++) {
					if (chipLength == game.players[game.playerTurn].chips[chipsOnPos[i]].distance) {
						if (pos < 32) {
							game.players[game.playerTurn].chips[chipsOnPos[i]].pos = 32 + 15 * game.playerTurn;
							game.players[game.playerTurn].chips[chipsOnPos[i]].distance = 1;
							knockoutOn(game, 32 + 15 * game.playerTurn);
						} else {
							var newPos = game.players[game.playerTurn].chips[chipsOnPos[i]].pos + game.lastDice;
							var newDistance = game.players[game.playerTurn].chips[chipsOnPos[i]].distance + game.lastDice
						
							if (newPos > 67 && newPos < 74) {
								newPos += -52;
							}
							
							if (newDistance > 53) {
								newPos = 14 + game.playerTurn*6 + newDistance;
							}
							
							if (newDistance == 59) {
								game.players[game.playerTurn].chips[chipsOnPos[i]].inAtTurn = game.turn;
								
							}
							
							game.players[game.playerTurn].chips[chipsOnPos[i]].distance = newDistance;
							game.players[game.playerTurn].chips[chipsOnPos[i]].pos = newPos;
							knockoutOn(game, newPos);
							
							checkWin(game);
						}
						
					}
						
					game.lastMoveTime = new Date();
					
					game.waitingForMove = false;
					game.posiblePos.length = 0; 
					
					returnValue = 1;
				}
				
				if (game.lastDice != 6) {
					nextPlayer(game);
				}
			}
			
		
		} else if ((game.boardSize === 8 && pos == 92) || pos === 166) {
			updatePosible(game);
			
			var allOnStart = true;
			for (var i = 0; i < 4;i++) if (game.players[game.playerTurn].chips[i].distance > 0 && game.players[game.playerTurn].chips[i].distance != 59) allOnStart = false;
			
			game.throwsLeft--;
			if (game.nextDice == 6) {
				game.throwsLeft = 1;
				if (game.posiblePos.length == 0);
				else game.waitingForMove = true;
			} else if (allOnStart && game.throwsLeft <= 0 && game.posiblePos.length == 0) {
				nextPlayer(game)
			} else if (!allOnStart) {
				if (game.posiblePos.length == 0) nextPlayer(game);
				else game.waitingForMove = true;
			}
			game.lastDice = game.nextDice;
			game.nextDice = dice();
			
			returnValue = 1;
		}
		
		checkWin(game);
		
		game.isProcessing = false;
		
		if (game.status == 2) returnValue = 2;
		
		return returnValue;
	},
	
	createGame: function(players, gameSettings) {
		if (players.length < 2) return;
		
		var game = {}
		game.playerTurn = 0;
		game.turn = 0;
		game.throwsLeft=3;
		game.waitingForMove = false;
		game.nextDice= dice();
		game.lastDice=3;
		game.posiblePos=[];
		game.posiblePosDest=[];
		game.gameId = gameIdIncrement;
		game.winners = [];
		game.status = 1;
		game.players = [];
		game.lastMoveTime = new Date();
		game.timeLeftTurn;
		game.isProcessing = false;
		game.idleTimeout = gameSettings.idleTimeout;
		game.idleKickTurns = gameSettings.idleKickTurns;
        game.boardSize = gameSettings.boardSize;
		
		for (var i = 0; i < players.length;i++) {
			game.players[i] = {};
			game.players[i].playerId = players[i].playerId;
			game.players[i].playerName = players[i].playerName;
			game.players[i].chips = [];
			game.players[i].status = 0;
			game.players[i].turnsIdle = 0;
			for (var j = 0; j < 4;j++) {
				game.players[i].chips[j] = {};
				game.players[i].chips[j].pos = j+i*4;
				game.players[i].chips[j].distance = 0;
				game.players[i].chips[j].inAtTurn = -1;
			}
		};
		
		setIdleTimeout(game);
		
		gameIdIncrement++;
		
		return game;
	},
	setSocket: function (socket) {
		io = socket;
	},
	setPlayerAuth: function (pa) {
		playerAuth = pa;
	}
};

var io, playerAuth;
var gameIdIncrement = 0;

var dicePos = 166

var gameTimeout = [];

function checkWin(game) {
								
	var allIn = true;
	for (var j = 0; j < 4;j++) {
		if (game.players[game.playerTurn].chips[j].inAtTurn == -1) allIn = false;
	}
	
	if (allIn && game.players[game.playerTurn].status == 0) {
		console.log("Game " + ": Player " + game.players[game.playerTurn].playerName + " won. ");
		game.players[game.playerTurn].status = 2;
		game.winners.push(game.playerTurn);
	}
	
	var inactivePlayers = [];
	for (var j = 0;j < game.players.length;j++) if (game.players[j].status == 1) inactivePlayers.push(j);
	
	if (game.winners.length + inactivePlayers.length == game.players.length - 1) {
		for (var j = 0; j < game.players.length;j++) {
			var hasWon = false;
			for (var k = 0;k < game.winners.length;k++) {
				if (j == game.winners[k]) hasWon = true;
			}
			
			if (!hasWon && game.players[j].status != 1) {	
				game.players[game.playerTurn].status = 2;
				game.winners.push(j);
			}
		}
		game.status = 2;
		io.emit('gamestop', "" + game.gameId);
	}
}

function resetIdleTimeout (game, idle) {
	
	if (gameTimeout[game.gameId]) clearTimeout(gameTimeout[game.gameId]);
	if (!idle) game.players[game.playerTurn].turnsIdle = 0;
	game.lastMoveTime = new Date();
	setIdleTimeout(game, playerAuth);
}

function setIdleTimeout (game) {
	
	gameTimeout[game.gameId] = setTimeout(function () {
		game.players[game.playerTurn].turnsIdle++;
		if (game.players[game.playerTurn].turnsIdle === game.idleKickTurns) {
			game.players[game.playerTurn].status = 1;
			playerAuth.setIngame(game.players[game.playerTurn].playerId, false);
			checkWin(game);
		}
		nextPlayer(game);
		game.waitingForMove = false;
		//updatePosible(game);
		game.posiblePos = [dicePos];
		io.emit("update", "" + game.gameId);
		resetIdleTimeout(game, true);
	}, game.idleTimeout);
}

function knockoutOn(game, pos) {
	for (var i = 0;i < game.players.length;i++) {
		if (i != game.playerTurn) {
			for (var j = 0;j < 4;j++) {
				if (game.players[i].chips[j].pos == pos) {
					if (i == 0 && pos != 32) {
						game.players[i].chips[j].pos = j+i*4;
						game.players[i].chips[j].distance = 0;
					}
					if (i == 1 && pos != 47) {
						game.players[i].chips[j].pos = j+i*4;
						game.players[i].chips[j].distance = 0;
					}
					if (i == 2 && pos != 62) {
						game.players[i].chips[j].pos = j+i*4;
						game.players[i].chips[j].distance = 0;
					}
					if (i == 3 && pos != 77) {
						game.players[i].chips[j].pos = j+i*4;
						game.players[i].chips[j].distance = 0;
					}
                    if (i == 4 && pos != 92) {
						game.players[i].chips[j].pos = j+i*4;
						game.players[i].chips[j].distance = 0;
					}
                    if (i == 5 && pos != 107) {
						game.players[i].chips[j].pos = j+i*4;
						game.players[i].chips[j].distance = 0;
					}
                    if (i == 6 && pos != 122) {
						game.players[i].chips[j].pos = j+i*4;
						game.players[i].chips[j].distance = 0;
					}
                    if (i == 7 && pos != 137) {
						game.players[i].chips[j].pos = j+i*4;
						game.players[i].chips[j].distance = 0;
					}
				}
			}
		}
	}
}

function nextPlayer(game) {
	
	if (game.status != 1) return;
	
	game.playerTurn++;
	if (game.playerTurn == game.players.length) {
		game.turn++;
		game.playerTurn = 0;
	}
	
	var hasWon = false;
	for (var i = 0;i < game.winners.length;i++) {
		if (game.playerTurn == game.winners[i]) hasWon = true;
	}
	
	if (!hasWon && game.players[game.playerTurn].status == 0) {
	
		var notStartedChips = 0;
		var chipsFinished = 0;
		for (var i = 0; i < 4;i++) {
			if (game.players[game.playerTurn].chips[i].distance == 0) notStartedChips++;
			if (game.players[game.playerTurn].chips[i].distance == 126) chipsFinished++;
		}

		game.throwsLeft = 1;
		
		if (notStartedChips + chipsFinished == 4) game.throwsLeft = 3;		
	
	} else {
		nextPlayer(game);
	}
}

function dice() {
	return Math.floor(Math.random() * 6) + 1  
}

function updatePosible(game) {
	game.posiblePos.length = 0;
	game.posiblePosDest.length = 0;
	
	for (var i = 0;i < 4;i++) {
		if (game.players[game.playerTurn].chips[i].distance + game.nextDice > 126);
		else if (game.players[game.playerTurn].chips[i].pos < 4*game.boardSize && game.nextDice == 6) game.posiblePos.push(game.players[game.playerTurn].chips[i].pos);
		else if (game.players[game.playerTurn].chips[i].pos >= 4*game.boardSize) game.posiblePos.push(game.players[game.playerTurn].chips[i].pos);
		
		if (game.posiblePos[game.posiblePos.length - 1] == game.players[game.playerTurn].chips[i].pos) {
			if (game.players[game.playerTurn].chips[i].pos < 4*game.boardSize) {
				game.posiblePosDest.push(4*game.boardSize + 13 * game.playerTurn);
			} else {
				var newPos = game.players[game.playerTurn].chips[i].pos + game.nextDice;
				var newDistance = game.players[game.playerTurn].chips[i].distance + game.nextDice;
			
				if (newPos > 67 && newPos < 74) {
					newPos += -52;
				}
				
				if (newDistance > 53) {
					newPos = 14 + game.playerTurn * 6 + newDistance
				}
				
				game.posiblePosDest.push(newPos);
			}
		}
	}
}
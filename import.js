module.exports = {
    dice: function () {
        return Math.floor(Math.random() * 6) + 1
    },

    gameLogic: function (game, playerId, pos, chipsToMove, moveChipsIn) {

        if (game.status !== 1 || game.isProcessing || game.players[game.playerTurn].playerId !== playerId) return false;

        let returnValue = 0;

        game.isProcessing = true;

        resetIdleTimeout(game);

        if (game.waitingForMove) {

            let chipsOnPos = [];

            for (let i = 0; i < 4; i++) {
                if (game.players[game.playerTurn].chips[i].pos === pos && (
                    moveChipsIn === undefined ||
                    (moveChipsIn && game.players[game.playerTurn].chips[i].distance === 53) ||
                    (moveChipsIn === false && game.players[game.playerTurn].chips[i].distance !== 53))
                ) {
                    chipsOnPos.push(i);
                }
            }

            if (chipsOnPos.length > 0) {

                let chipLength = game.players[game.playerTurn].chips[chipsOnPos[0]].distance;

                for (let i = 0; i < chipsToMove; i++) {

                    if (chipLength === game.players[game.playerTurn].chips[chipsOnPos[i]].distance) {

                        if (pos < 16) {

                            game.players[game.playerTurn].chips[chipsOnPos[i]].pos = 16 + 13 * game.playerTurn;
                            game.players[game.playerTurn].chips[chipsOnPos[i]].distance = 1;
                            knockoutOn(game, 16 + 13 * game.playerTurn);

                        } else {

                            let newPos = game.players[game.playerTurn].chips[chipsOnPos[i]].pos + game.lastDice;
                            let newDistance = game.players[game.playerTurn].chips[chipsOnPos[i]].distance + game.lastDice
                            game.players[game.playerTurn].stats.totalDistance += game.lastDice;
                            game.players[game.playerTurn].stats.sumDistance += game.lastDice;

                            if (newPos > 67 && newPos < 74) {
                                newPos += -52;
                            }

                            if (newDistance > 53) {
                                newPos = 14 + game.playerTurn * 6 + newDistance;
                            }

                            if (newDistance === 59) {
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

                if (game.lastDice !== 6) {
                    nextPlayer(game);
                }
            }


        } else if (pos === 92) {
            updatePosible(game);

            let allOnStart = true;
            for (let i = 0; i < 4; i++) if (game.players[game.playerTurn].chips[i].distance > 0 && game.players[game.playerTurn].chips[i].distance !== 59) allOnStart = false;

            game.throwsLeft--;

            if (game.nextDice === 6) {

                game.throwsLeft = 1;
                game.currentCombo++;

                if (game.currentCombo > game.players[game.playerTurn].stats.highestCombo) game.players[game.playerTurn].stats.highestCombo = game.currentCombo;
                if (game.posiblePos.length !== 0) game.waitingForMove = true;

            } else if (allOnStart && game.throwsLeft <= 0 && game.posiblePos.length === 0) {

                nextPlayer(game)

            } else if (!allOnStart) {

                if (game.posiblePos.length === 0) nextPlayer(game);
                else game.waitingForMove = true;

            }

            game.lastDice = game.nextDice;
            game.nextDice = dice();

            returnValue = 1;
        }

        checkWin(game);

        game.isProcessing = false;

        if (game.status === 2) returnValue = 2;

        return returnValue;
    },

    createGame: function (players, gameSettings) {
        if (players.length < 2) return;

        let game = {};
        game.playerTurn = 0;
        game.turn = 0;
        game.throwsLeft = 3;
        game.waitingForMove = false;
        game.nextDice = dice();
        game.lastDice = 3;
        game.posiblePos = [];
        game.posiblePosDest = [];
        game.gameId = gameIdIncrement;
        game.winners = [];
        game.status = 1;
        game.players = [];
        game.lastMoveTime = new Date();
        game.timeLeftTurn;
        game.isProcessing = false;
        game.chatMessages = [];
        game.idleTimeout = gameSettings.idleTimeout;
        game.idleKickTurns = gameSettings.idleKickTurns;
        game.version = 0;
        game.currentCombo = 0;

        for (let i = 0; i < players.length; i++) {
            game.players[i] = {};
            game.players[i].playerId = players[i].playerId;
            game.players[i].playerName = players[i].playerName;
            game.players[i].chips = [];
            game.players[i].status = 0;
            game.players[i].turnsIdle = 0;
            game.players[i].turnsIdleTotal = 0;
            for (let j = 0; j < 4; j++) {
                game.players[i].chips[j] = {};
                game.players[i].chips[j].pos = j + i * 4;
                game.players[i].chips[j].distance = 0;
                game.players[i].chips[j].inAtTurn = -1;
            }
            game.players[i].stats = {};
            game.players[i].stats.totalDistance = 0;
            game.players[i].stats.sumDistance = 0;
            game.players[i].stats.knockouts = 0;
            game.players[i].stats.chipsLost = 0;
            game.players[i].stats.highestCombo = 0;
            game.players[i].stats.largestKnockout = 0;
        }

        setIdleTimeout(game);

        gameIdIncrement++;

        return game;
    },
    postChatMessage: function (game, player, text, color) {
        addChatMessage(game, player, text, color);
    },
    setSocket: function (socket) {
        io = socket;
    },
    setPlayerAuth: function (pa) {
        playerAuth = pa;
    },
    leaveGame: function (game, player) {
        leaveGame(game, player);
    }
};

var io, playerAuth;
var gameIdIncrement = 0;

var gameTimeout = [];

function addChatMessage(game, player, text, color) {
    game.chatMessages.push({player: player, time: new Date(), text: text, color: "#ffffff"});
    //io.emit("update", "" + game.gameId);
}

function checkWin(game) {

    let allIn = true;

    for (let j = 0; j < 4; j++) {
        if (game.players[game.playerTurn].chips[j].inAtTurn === -1) allIn = false;
    }

    if (allIn && game.players[game.playerTurn].status === 0) {
        console.log("Game " + ": Player " + game.players[game.playerTurn].playerName + " won. ");
        game.players[game.playerTurn].status = 2;
        game.winners.push(game.playerTurn);
    }

    let inactivePlayers = [];

    for (let j = 0; j < game.players.length; j++) if (game.players[j].status === 1) inactivePlayers.push(j);

    if (game.winners.length + inactivePlayers.length === game.players.length - 1) {
        for (let j = 0; j < game.players.length; j++) {

            let hasWon = false;

            for (let k = 0; k < game.winners.length; k++) {
                if (j === game.winners[k]) hasWon = true;
            }

            if (!hasWon && game.players[j].status !== 1) {
                game.players[game.playerTurn].status = 2;
                game.winners.push(j);
            }
        }

        game.status = 2;
        io.emit('gamestop', "" + game.gameId);
        if (gameTimeout[game.gameId])
            clearTimeout(gameTimeout[game.gameId]);
    }
}

function resetIdleTimeout(game, idle) {

    if (gameTimeout[game.gameId]) clearTimeout(gameTimeout[game.gameId]);
    if (!idle) game.players[game.playerTurn].turnsIdle = 0;
    game.lastMoveTime = new Date();
    setIdleTimeout(game, playerAuth);
}

function setIdleTimeout(game) {

    gameTimeout[game.gameId] = setTimeout(function () {
        game.players[game.playerTurn].turnsIdle++;
        game.players[game.playerTurn].turnsIdleTotal++;
        if (game.players[game.playerTurn].turnsIdle === game.idleKickTurns || game.players[game.playerTurn].turnsIdleTotal === game.idleKickTurnsTotal) {
            game.players[game.playerTurn].status = 1;
            playerAuth.setIngame(game.players[game.playerTurn].playerId, false);
            checkWin(game);
        }
        nextPlayer(game);
        game.waitingForMove = false;
        //updatePosible(game);
        game.posiblePos = [92];
        io.emit("update", "" + game.gameId);
        if (game.status === 1)
            resetIdleTimeout(game, true);
    }, game.idleTimeout);
}

function leaveGame(game, player, update) {
    for (let i = 0; i < game.players.length; i++) {

        if (game.players[i].playerId === player.playerId) {

            game.players[i].status = 1;
            playerAuth.setIngame(player.playerId, false);
            checkWin(game);
            nextPlayer(game);
            game.waitingForMove = false;
            game.posiblePos = [92];

            if (game.playerTurn === i && game.status === 1)
                resetIdleTimeout(game, true);

            io.emit("update", "" + game.gameId);
        }
    }
}

function knockoutOn(game, pos) {
    for (let i = 0; i < game.players.length; i++) {

        if (i !== game.playerTurn) {

            let chipsKnockedOut = 0;

            for (let j = 0; j < 4; j++) {

                if (game.players[i].chips[j].pos === pos) {
                    if (i === 0 && pos !== 16) {
                        game.players[i].chips[j].pos = j + i * 4;
                        game.players[i].chips[j].distance = 0;
                        game.players[game.playerTurn].stats.knockouts++;
                        game.players[i].stats.chipsLost++;
                        chipsKnockedOut++;
                        recalcSumDistance(game, i);
                    }
                    if (i == 1 && pos != 29) {
                        game.players[i].chips[j].pos = j + i * 4;
                        game.players[i].chips[j].distance = 0;
                        game.players[game.playerTurn].stats.knockouts++;
                        game.players[i].stats.chipsLost++;
                        chipsKnockedOut++;
                        recalcSumDistance(game, i);
                    }
                    if (i == 2 && pos != 42) {
                        game.players[i].chips[j].pos = j + i * 4;
                        game.players[i].chips[j].distance = 0;
                        game.players[game.playerTurn].stats.knockouts++;
                        game.players[i].stats.chipsLost++;
                        chipsKnockedOut++;
                        recalcSumDistance(game, i);
                    }
                    if (i == 3 && pos != 55) {
                        game.players[i].chips[j].pos = j + i * 4;
                        game.players[i].chips[j].distance = 0;
                        game.players[game.playerTurn].stats.knockouts++;
                        game.players[i].stats.chipsLost++;
                        chipsKnockedOut++;
                        recalcSumDistance(game, i);
                    }
                }
            }

            if (chipsKnockedOut > game.players[game.playerTurn].stats.largestKnockout) game.players[game.playerTurn].stats.largestKnockout = chipsKnockedOut;
        }
    }
}

function nextPlayer(game) {

    if (game.status !== 1) return;

    game.playerTurn++;
    game.currentCombo = 0;

    if (game.playerTurn === game.players.length) {

        game.turn++;
        game.playerTurn = 0;

    }

    let hasWon = false;

    for (let i = 0; i < game.winners.length; i++) {
        if (game.playerTurn == game.winners[i]) hasWon = true;
    }

    if (!hasWon && game.players[game.playerTurn].status === 0) {

        let notStartedChips = 0;
        let chipsFinished = 0;

        for (let i = 0; i < 4; i++) {
            if (game.players[game.playerTurn].chips[i].distance === 0) notStartedChips++;
            if (game.players[game.playerTurn].chips[i].distance === 59) chipsFinished++;
        }

        game.throwsLeft = 1;

        if (notStartedChips + chipsFinished === 4) game.throwsLeft = 3;

    } else {
        nextPlayer(game);
    }
}

function dice() {
    return Math.floor(Math.random() * 6) + 1
}

function recalcSumDistance(game, playerIndex) {
    game.players[playerIndex].stats.sumDistance = 0;

    for (let i = 0; i < 4; i++) game.players[playerIndex].stats.sumDistance += game.players[playerIndex].chips[i].distance;
}

function updatePosible(game) {
    game.posiblePos.length = 0;
    game.posiblePosDest.length = 0;

    for (let i = 0; i < 4; i++) {

        if (game.players[game.playerTurn].chips[i].distance + game.nextDice > 59) ;
        else if (game.players[game.playerTurn].chips[i].pos < 16 && game.nextDice === 6) game.posiblePos.push(game.players[game.playerTurn].chips[i].pos);
        else if (game.players[game.playerTurn].chips[i].pos >= 16) game.posiblePos.push(game.players[game.playerTurn].chips[i].pos);

        if (game.posiblePos[game.posiblePos.length - 1] === game.players[game.playerTurn].chips[i].pos) {

            if (game.players[game.playerTurn].chips[i].pos < 16) {
                game.posiblePosDest.push(16 + 13 * game.playerTurn);
            } else {

                let newPos = game.players[game.playerTurn].chips[i].pos + game.nextDice;
                let newDistance = game.players[game.playerTurn].chips[i].distance + game.nextDice;

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
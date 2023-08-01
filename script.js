'use strict'

const startGameButton = document.querySelector('[data-start-game-button]')
const startGameButtonContent = document.querySelector('[data-start-game-button-content]')

const gameWinMessage = document.querySelector('[data-game-win-message]')
const gameWinMessageContent = document.querySelector('[data-game-win-message-content]')

const mainBoard = document.querySelector('[data-main-board]')
const cell = document.querySelectorAll('[data-cell]')

let player = 'X'

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let options = ["", "", "", "", "", "", "", "", ""]

// Initial setting to start any game when page is loaded
const initialGame = function () {
    gameWinMessage.style.display = 'none'
    mainBoard.style.display = 'none'
}
initialGame()


// Game start conditions
const startGame = function () {
    gameWinMessage.style.display = 'block'
    mainBoard.style.display = 'grid'
    startGameButton.style.display = 'none'

    cell.forEach(con => con.textContent = '')

    options = ["", "", "", "", "", "", "", "", ""]
    player = 'X'
    //gameWinMessageContent.textContent = `${player}'s turn, good luck!`
    gameWinMessageContent.innerHTML = `<span class='play'>${player}</span>'s turn, good luck!`
}
startGameButton.addEventListener('click', startGame)


const playingGame = function () {
    mainBoard.addEventListener('click', function (e) {
        e.preventDefault()
        //Matching parent with child
        if (e.target.classList.contains('cell')) {
            const cell = e.target.getAttribute('cellIndex')

            //add choice
            addChoice(e)

            //check winner
            checkWinner()

            //update cell @ player's message
            updateCell(e) // Last one because changes the players

            //Check Tie
            checkDraw()
        }
    })
}

playingGame()

const addChoice = function (e) {
    options[e.target.getAttribute('cellIndex')] = player
    //console.log(options);
}

const checkWinner = function () {
    winCombinations.forEach(pos => {
        const cellA = options[pos[0]]
        const cellB = options[pos[1]]
        const cellC = options[pos[2]]

        if (cellA !== '' && cellA === cellB && cellB === cellC) {
            //console.log(`Player ${player} won the game!`);
            winning()
            startGameButtonContent.innerHTML = `Player <span class='green'>${player}</span> won the game!`
        }
    })
}

const updateCell = function (e) {
    if (e.target.textContent !== '') return // check if the cell is empty
    else {
        e.target.textContent = player// to change the player
        player = (player === 'X') ? 'O' : 'X'
        //gameWinMessageContent.textContent = `${player}'s turn, good luck!`
        gameWinMessageContent.innerHTML = `<span class='play'>${player}</span>'s turn, good luck!`
    }
}
//
const checkDraw = function () {
    if (!options.includes('')) {
        winning()
        startGameButtonContent.innerHTML = `It's a <span class='play'>draw</span> :(`
    }
}

const winning = function () {
    gameWinMessage.style.display = 'none'
    mainBoard.style.display = 'none'
    startGameButton.style.display = 'block'
    startGameButton.addEventListener('click', startGame)
}
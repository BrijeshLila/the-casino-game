let balance = 1000;  
let betAmount = 0;
let gameBoard = [];
let clickedBoxes = [];
let bombIndices = [];
let isGameActive = false;
let diamondsFound = 0;
let multiplier = 1.20;  

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('cashOut').addEventListener('click', cashOut);

function startGame() {
    const betInput = document.getElementById('betAmount');
    betAmount = parseFloat(betInput.value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert('Invalid bet amount! Enter a valid amount.');
        return;
    }

    isGameActive = true;
    balance -= betAmount;
    document.getElementById('currentBalance').textContent = balance.toFixed(2);

    diamondsFound = 0;
    multiplier = 1.20;
    clickedBoxes = [];
    bombIndices = [];

    document.getElementById('multiplierDisplay').innerHTML = "";

    generateGameBoard();
    document.getElementById('cashOut').style.display = 'none';
}

function generateGameBoard() {
    const gameBoardElement = document.getElementById('gameBoard');
    gameBoardElement.innerHTML = '';

    bombIndices = [];
    while (bombIndices.length < 4) {  
        const randomIndex = Math.floor(Math.random() * 25);
        if (!bombIndices.includes(randomIndex)) {
            bombIndices.push(randomIndex);
        }
    }

    for (let i = 0; i < 25; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.dataset.index = i;
        box.addEventListener('click', revealBox);
        gameBoardElement.appendChild(box);
        gameBoard.push(box);
    }
}

function revealBox(event) {
    if (!isGameActive) return;

    const box = event.target;
    const boxIndex = parseInt(box.dataset.index);

    if (clickedBoxes.includes(boxIndex)) return;
    clickedBoxes.push(boxIndex);

    if (bombIndices.includes(boxIndex)) {
        box.classList.add('bomb');
        box.textContent = '💣';
        showPopup(`💥 Game Over! You lost $${betAmount.toFixed(2)}!`);
        isGameActive = false;
        return;
    } else {
        box.classList.add('diamond');
        box.textContent = '💎';
        diamondsFound++;

        let currentMultiplier = (1.20 + (diamondsFound - 1) * 0.20).toFixed(2);
        multiplier = parseFloat(currentMultiplier);

        document.getElementById('multiplierDisplay').innerHTML += `<span class="multiplier">${currentMultiplier}x</span>`;

        if (diamondsFound === 1) {
            document.getElementById('cashOut').style.display = 'block';
        }
    }
}

function cashOut() {
    if (!isGameActive) return;

    const winAmount = betAmount * multiplier;
    balance += winAmount;

    document.getElementById('cashOut').style.display = 'none';
    document.getElementById('currentBalance').textContent = balance.toFixed(2);

    showPopup(`✅ Cashed Out! You won $${winAmount.toFixed(2)}!`);
    isGameActive = false;
}

function showPopup(message) {
    const popup = document.getElementById('resultPopup');
    popup.textContent = message;
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
        restartGame();  
    }, 3000);
}

function restartGame() {
    document.getElementById('betAmount').value = '';
    document.getElementById('cashOut').style.display = 'none';
    generateGameBoard();
    isGameActive = true;  
}
function goBack() {
    window.location.href = "dashboard.html"; // Redirects to the dashboard
}
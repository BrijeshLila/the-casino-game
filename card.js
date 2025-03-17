const suits = ["♠", "♥", "♣", "♦"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let balance = 1000;
let selectedPlayer = null;

// Update balance display
function updateBalance() {
    document.getElementById("balance").textContent = balance;
}

// Select player
function selectPlayer(player) {
    selectedPlayer = player;
    document.getElementById("player1-btn").classList.remove("active");
    document.getElementById("player2-btn").classList.remove("active");
    document.getElementById(`player${player}-btn`).classList.add("active");
    checkConditions();
}

// Check conditions for enabling flip button
function checkConditions() {
    const betAmount = document.getElementById("bet-amount").value;
    document.getElementById("flip-btn").disabled = !(selectedPlayer && betAmount > 0 && betAmount <= balance);
}

// Generate random card
function getRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rankIndex = Math.floor(Math.random() * ranks.length);
    return { suit, rank: ranks[rankIndex], value: rankIndex };
}

// Flip cards
function flipCards() {
    const betAmount = parseInt(document.getElementById("bet-amount").value);
    
    const card1 = getRandomCard();
    const card2 = getRandomCard();
    
    document.getElementById("player1-rank").textContent = card1.rank;
    document.getElementById("player1-suit").textContent = card1.suit;
    document.getElementById("player2-rank").textContent = card2.rank;
    document.getElementById("player2-suit").textContent = card2.suit;
    
    document.getElementById("player1-card").classList.add("flipped");
    document.getElementById("player2-card").classList.add("flipped");
    
    setTimeout(() => {
        showResult(card1, card2, betAmount);
    }, 3000);  // Show result 3 seconds after flipping
}

// Show result in the popup box
function showResult(card1, card2, betAmount) {
    let resultText = "";
    let emoji = "";
    let profitLoss = 0;

    if (card1.value > card2.value) {
        resultText = "Player 1 Wins!";
        emoji = "🎉";
        profitLoss = selectedPlayer === 1 ? betAmount : -betAmount;
    } else if (card2.value > card1.value) {
        resultText = "Player 2 Wins!";
        emoji = "🏆";
        profitLoss = selectedPlayer === 2 ? betAmount : -betAmount;
    } else {
        resultText = "It's a Draw!";
        emoji = "😐";
        profitLoss = 0;
    }

    balance += profitLoss;
    updateBalance();

    const popup = document.getElementById("popup");
    popup.innerHTML = `${resultText} ${emoji}<br> ${profitLoss >= 0 ? "You Win" : "You Lose"} ${Math.abs(profitLoss)} 💰`;
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
        resetGame();
    }, 4000);  // Hide popup after 4 seconds
}

// Reset Game
function resetGame() {
    setTimeout(() => {
        document.getElementById("player1-card").classList.remove("flipped");
        document.getElementById("player2-card").classList.remove("flipped");
        document.getElementById("bet-amount").value = "";
        selectedPlayer = null;
        checkConditions();
    }, 2000);
}
function goBack() {
    window.location.href = "dashboard.html"; // Redirects to the dashboard
}
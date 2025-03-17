let balance = 1000;
let betAmount = 0;
let selectedColor = null;
let timeLeft = 15;
let timerInterval;
let isTimerRunning = false;
let betHistory = [];

function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            showResult();
            setTimeout(() => { timeLeft = 15; }, 3000);
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById("timer").innerText = timeLeft;
}

function placeBet(color) {
    if (isTimerRunning) {
        alert("Please wait for the current round to finish!");
        return;
    }
    betAmount = parseInt(document.getElementById("bet-amount").value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert("Enter a valid bet amount!");
        return;
    }
    selectedColor = color;
    startTimer();
}

function showResult() {
    const colors = ["Green", "Violet", "Red"];
    const winningColor = colors[Math.floor(Math.random() * colors.length)];
    let outcome = selectedColor === winningColor ? "Win" : "Lose";
    let popupMessage = document.getElementById("popup-message");
    let popupAmount = document.getElementById("popup-amount");
    let popupWinningColor = document.getElementById("popup-winning-color");

    if (outcome === "Win") {
        balance += betAmount * 2;
        popupMessage.innerText = "🎉 You Win!";
        popupAmount.innerText = `+₹${betAmount * 2}`;
    } else {
        balance -= betAmount;
        popupMessage.innerText = "❌ You Lose!";
        popupAmount.innerText = `-₹${betAmount}`;
    }

    popupWinningColor.innerHTML = `Winning Color: <span class="${winningColor.toLowerCase()}">${winningColor}</span>`;

    document.getElementById("balance").innerText = balance;

    betHistory.push({
        amount: betAmount,
        color: selectedColor,
        result: outcome,
        winningColor: winningColor
    });
    updateHistory();
    showPopup();
    timeLeft = 15;
}

function updateHistory() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";
    betHistory.forEach(bet => {
        const listItem = document.createElement("li");
        listItem.classList.add("history-item");

        const colorBall = document.createElement("span");
        colorBall.classList.add("color-ball", `${bet.color.toLowerCase()}-ball`);

        listItem.innerHTML = `
            ${colorBall.outerHTML}
            ${bet.color} - ₹${bet.amount} (${bet.result})
        `;

        historyList.appendChild(listItem);
    });
}

function showPopup() {
    document.getElementById("popup").style.display = "block";
    setTimeout(closePopup, 5000);
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

window.addEventListener('load', function() {
    // Add flash effect on page load
    document.body.classList.add('flash-effect');
});

function goBack() {
    window.location.href = "dashboard.html"; // Redirects to the dashboard
}
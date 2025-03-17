let rollButton = document.getElementById('roll-button');
let dice1 = document.getElementById('dice1');
let dice2 = document.getElementById('dice2');
let result = document.getElementById('result');
let countdownDisplay = document.getElementById('countdown');
let isRolling = false; // To prevent multiple clicks while countdown is active

function generateNumber(diceValue, diceElement) {
    // Clear previous number
    diceElement.innerHTML = '';
    
    // Add number based on dice value
    let number = document.createElement('span');
    number.textContent = diceValue;
    diceElement.appendChild(number);
}

function rollDice() {
    if (isRolling) return; // Prevent clicking the button multiple times

    isRolling = true;
    rollButton.disabled = true; // Disable the button while rolling

    // Generate random dice values
    let dice1Value = Math.floor(Math.random() * 6) + 1;
    let dice2Value = Math.floor(Math.random() * 6) + 1;

    // Apply rotation for multiple times (5 full rotations)
    let rotations = 100;
    let rotationDegree1 = rotations * 360;
    let rotationDegree2 = rotations * 360;

    // Reset rotation styles before each roll
    dice1.style.transition = 'none'; // Disable transition for immediate effect
    dice2.style.transition = 'none'; // Disable transition for immediate effect
    dice1.style.transform = `rotate(0deg)`; // Reset dice1 rotation
    dice2.style.transform = `rotate(0deg)`; // Reset dice2 rotation

    // Trigger reflow to ensure the styles reset properly
    dice1.offsetHeight; // Trigger reflow
    dice2.offsetHeight; // Trigger reflow

    // Now enable rotation transition again
    dice1.style.transition = 'transform 2s ease-out';
    dice2.style.transition = 'transform 2s ease-out';
    dice1.style.transform = `rotate(${rotationDegree1}deg)`; // Rotate dice1
    dice2.style.transform = `rotate(${rotationDegree2}deg)`; // Rotate dice2

    // After the rotation ends (2 seconds), generate the numbers and show result
    setTimeout(() => {
        // Generate the numbers on the dice after rotation
        generateNumber(dice1Value, dice1);
        generateNumber(dice2Value, dice2);

        // Determine the winner
        if (dice1Value > dice2Value) {
            result.textContent = 'Dice  1 Wins!';
        } else if (dice2Value > dice1Value) {
            result.textContent = 'Dice  2 Wins!';
        } else {
            result.textContent = 'It\'s a Tie!';
        }

        // Start countdown timer after 2 seconds (right after the rotation)
        startCountdown();
        
    }, 2000); // Wait for rotation to finish before showing numbers and result
}

// Countdown function
function startCountdown() {
    let countdownTime = 10;
    countdownDisplay.textContent = `Next Roll In: ${countdownTime}s`;

    // Countdown timer
    let countdownInterval = setInterval(() => {
        countdownTime--;
        countdownDisplay.textContent = `Next Roll In: ${countdownTime}s`;

        if (countdownTime <= 0) {
            clearInterval(countdownInterval); // Stop countdown
            countdownDisplay.textContent = "You can roll now!";
            isRolling = false; // Allow next roll
            rollButton.disabled = false; // Re-enable the button after countdown
        }
    }, 1000); // Update every second
}

rollButton.addEventListener('click', rollDice);


function goBack() {
    window.location.href = "dashboard.html"; // Redirects to the dashboard
}
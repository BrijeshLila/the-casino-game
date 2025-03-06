// Function to toggle password visibility
function togglePassword() {
  let passwordField = document.getElementById("login-password");
  let toggleButton = document.getElementById("toggle-password");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleButton.textContent = "Hide";
  } else {
    passwordField.type = "password";
    toggleButton.textContent = "Show";
  }
}

// Function to generate CAPTCHA
function generateCaptcha() {
  let captchaText = Math.random().toString(36).substring(2, 8).toUpperCase();
  document.getElementById("captcha-code").innerText = captchaText;
}

// Function to show Sign Up page
function showSignUp() {
  document.getElementById("login-page").classList.add("hidden");
  document.getElementById("signup-page").classList.remove("hidden");
  generateCaptcha();
}

// Function to show Login page
function showLogin() {
  document.getElementById("signup-page").classList.add("hidden");
  document.getElementById("login-page").classList.remove("hidden");
}

// Function to sign up user
function signUpUser() {
  let username = document.getElementById("signup-username").value;
  let password = document.getElementById("signup-password").value;
  let captchaInput = document.getElementById("captcha-input").value;
  let captchaCode = document.getElementById("captcha-code").innerText;

  if (!username || !password || !captchaInput) {
    alert("All fields are required!");
    return;
  }

  if (captchaInput !== captchaCode) {
    alert("Invalid CAPTCHA!");
    generateCaptcha();
    return;
  }

  localStorage.setItem("user", JSON.stringify({ username, password }));
  alert("Signup successful! You can now login.");
  showLogin();
}

// Function to log in user
function loginUser() {
  let username = document.getElementById("login-username").value;
  let password = document.getElementById("login-password").value;

  let storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && storedUser.username === username && storedUser.password === password) {
    alert("Login successful!");
    localStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid username or password!");
  }
}

// Auto redirect logged-in users to dashboard
window.onload = function() {
  if (localStorage.getItem("loggedInUser")) {
    window.location.href = "dashboard.html";
  }
};

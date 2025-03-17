document.addEventListener("DOMContentLoaded", () => {
    const gameItems = document.querySelectorAll(".game-item img");
    
    gameItems.forEach(item => {
        item.addEventListener("click", () => {
            alert("Game clicked: " + item.alt);
        });
    });
});

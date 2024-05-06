const searchInput = document.getElementById("search");
const resetBtn = document.getElementById("reset");
const resetSymbol = document.getElementById("resetSymbol");

// Initially hide reset button and symbol
resetBtn.style.visibility = "hidden";
resetSymbol.style.visibility = "hidden";

searchInput.addEventListener("input", () => {
    // Check if search input value is empty
    if (searchInput.value.trim() !== "") {
        // Show reset button and symbol
        resetBtn.style.visibility = "visible";
        resetSymbol.style.visibility = "visible";
    } else {
        // Hide reset button and symbol
        resetBtn.style.visibility = "hidden";
        resetSymbol.style.visibility = "hidden";
    }
});

resetBtn.addEventListener("click", () => {
    resetBtn.style.visibility = "hidden";
    resetSymbol.style.visibility = "hidden";
});
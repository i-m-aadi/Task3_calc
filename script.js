const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

// Calculator state
let currentValue = "0";
let storedValue = null;
let pendingOperator = null;
let shouldResetDisplay = false;


// Update calculator display
function updateDisplay() {
    currentDisplay.textContent = currentValue;
}


// Add number or decimal
function inputNumber(number) {

    // Start a new number after an operation
    if (shouldResetDisplay) {
        currentValue = "0";
        shouldResetDisplay = false;
    }

    // Prevent multiple decimal points
    if (number === "." && currentValue.includes(".")) {
        return;
    }

    // Replace initial zero
    if (currentValue === "0" && number !== ".") {
        currentValue = number;
    } else {
        currentValue += number;
    }

    updateDisplay();
}


// Perform calculation
function calculate(firstNumber, secondNumber, operator) {

    const first = Number(firstNumber);
    const second = Number(secondNumber);

    switch (operator) {

        case "+":
            return first + second;

        case "-":
            return first - second;

        case "*":
            return first * second;

        case "/":

            if (second === 0) {
                return null;
            }

            return first / second;

        default:
            return second;
    }
}


// Handle operator
function handleOperator(operator) {

    // If calculator is already in an error state
    if (currentValue === "Error") {
        return;
    }

    // If an operator already exists,
    // calculate the previous operation first.
    if (pendingOperator !== null && !shouldResetDisplay) {

        const result = calculate(
            storedValue,
            currentValue,
            pendingOperator
        );

        if (result === null) {
            showError();
            return;
        }

        storedValue = result;
        currentValue = String(result);

    } else {

        storedValue = Number(currentValue);
    }

    pendingOperator = operator;
    shouldResetDisplay = true;

    previousDisplay.textContent =
        `${formatNumber(storedValue)} ${displayOperator(operator)}`;

    updateDisplay();
}


// Handle equals
function handleEquals() {

    if (
        pendingOperator === null ||
        storedValue === null ||
        currentValue === "Error"
    ) {
        return;
    }

    const result = calculate(
        storedValue,
        currentValue,
        pendingOperator
    );

    if (result === null) {
        showError();
        return;
    }

    previousDisplay.textContent =
        `${formatNumber(storedValue)} ${displayOperator(pendingOperator)} ${currentValue} =`;

    currentValue = String(result);

    storedValue = null;
    pendingOperator = null;
    shouldResetDisplay = true;

    updateDisplay();
}


// Clear calculator
function clearCalculator() {

    currentValue = "0";
    storedValue = null;
    pendingOperator = null;
    shouldResetDisplay = false;

    previousDisplay.textContent = "";

    updateDisplay();
}


// Show error
function showError() {

    currentValue = "Error";
    storedValue = null;
    pendingOperator = null;
    shouldResetDisplay = true;

    previousDisplay.textContent = "Cannot divide by zero";

    updateDisplay();
}


// Convert operator into calculator symbol
function displayOperator(operator) {

    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    return symbols[operator];
}


// Format large numbers
function formatNumber(number) {

    if (!Number.isFinite(Number(number))) {
        return "Error";
    }

    return Number(number).toLocaleString("en-US", {
        maximumFractionDigits: 10
    });
}


// Number button events
numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        inputNumber(button.dataset.number);

    });

});


// Operator button events
operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        handleOperator(button.dataset.operator);

    });

});


// Equals button
equalsButton.addEventListener("click", handleEquals);


// Clear button
clearButton.addEventListener("click", clearCalculator);


// Keyboard support
document.addEventListener("keydown", event => {

    if (
        (event.key >= "0" && event.key <= "9") ||
        event.key === "."
    ) {

        inputNumber(event.key);

    } else if (
        ["+", "-", "*", "/"].includes(event.key)
    ) {

        handleOperator(event.key);

    } else if (event.key === "Enter" || event.key === "=") {

        handleEquals();

    } else if (event.key === "Escape") {

        clearCalculator();

    }

});
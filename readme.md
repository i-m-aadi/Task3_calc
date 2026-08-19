# Calculator

A responsive calculator built using HTML5, CSS3, and JavaScript.

## Features

* Addition
* Subtraction
* Multiplication
* Division
* Decimal numbers
* Clear functionality
* Equals functionality
* Chained operations
* Divide-by-zero error handling
* Keyboard support
* Responsive calculator layout
* CSS Grid button layout
* No use of `eval()`

## Technologies Used

* HTML5
* CSS3
* JavaScript

## Project Structure

```text
calculator/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## How It Works

The calculator maintains three important pieces of state:

* `currentValue` — the number currently displayed.
* `storedValue` — the previously entered number used for calculations.
* `pendingOperator` — the operation that should be performed.

For example, when entering:

```text
5 + 3
```

The calculator stores:

```text
storedValue = 5
pendingOperator = "+"
currentValue = 3
```

When the user presses `=`, JavaScript performs the appropriate operation and displays the result.

## Chained Operations

The calculator supports chained operations.

For example:

```text
5 + 3 × 2
```

Operations are calculated as they are entered:

```text
5 + 3 = 8
8 × 2 = 16
```

Therefore, the final result is:

```text
16
```

## Divide-by-Zero

Division by zero is handled explicitly.

For example:

```text
10 ÷ 0
```

The calculator displays:

```text
Error
```

instead of displaying `Infinity` or crashing.

## Why `eval()` Is Not Used

`eval()` executes a string as JavaScript code. Using it for calculator input is unnecessary and can create security risks when input is not fully controlled.

Instead, this project explicitly tracks the current value, stored value, and pending operator and performs each mathematical operation using JavaScript functions.

## How to Run

1. Download or clone the repository.
2. Open the project folder.
3. Open `index.html` in a web browser.

No additional dependencies or installation are required.

## Future Improvements

Possible improvements include:

* Percentage button
* Backspace button
* Calculation history
* Dark/light theme
* Scientific calculator functions
* Better floating-point precision handling

## Author

Aditya Pandey

let currentOperation = null;
let firstOperand = null;

function appendNumber(number) {
    const display = document.getElementById('display');
    if (display.innerText === '0') {
        display.innerText = number;
    } else {
        display.innerText += number;
    }
}

function setOperation(operation) {
    firstOperand = parseFloat(document.getElementById('display').innerText);
    currentOperation = operation;
    document.getElementById('display').innerText = '0';
}

function clearDisplay() {
    document.getElementById('display').innerText = '0';
    currentOperation = null;
    firstOperand = null;
}

async function calculate() {
    const secondOperand = parseFloat(document.getElementById('display').innerText);
    const response = await fetch(`http://localhost:5000/api/calculator/calculate?operation=${currentOperation}&num1=${firstOperand}&num2=${secondOperand}`);
    const data = await response.json();
    document.getElementById('display').innerText = data.result;
}

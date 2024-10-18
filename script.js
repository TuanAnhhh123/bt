const display = document.querySelector('#display');
const keys = document.querySelector('.calculator-keys');

let firstOperand = '';
let secondOperand = '';
let operator = '';
let waitingForSecondOperand = false;

function updateDisplay(value) {
  display.value = value;
}

function calculate(first, second, operator) {
  switch (operator) {
    case '+':
      return parseFloat(first) + parseFloat(second);
    case '-':
      return parseFloat(first) - parseFloat(second);
    case '*':
      return parseFloat(first) * parseFloat(second);
    case '/':
      return parseFloat(first) / parseFloat(second);
    default:
      return second;
  }
}

keys.addEventListener('click', function(event) {
  const { target } = event;
  const value = target.value;

  if (!target.matches('button')) {
    return;
  }

  if (!isNaN(value) || value === '.') {
    if (waitingForSecondOperand) {
      secondOperand += value;
      updateDisplay(secondOperand);
    } else {
      firstOperand += value;
      updateDisplay(firstOperand);
    }
    return;
  }

  if (['+', '-', '*', '/'].includes(value)) {
    if (!waitingForSecondOperand && firstOperand) {
      operator = value;
      waitingForSecondOperand = true;
    }
    return;
  }

  if (value === '=') {
    if (firstOperand && secondOperand && operator) {
      const result = calculate(firstOperand, secondOperand, operator);
      updateDisplay(result);
      firstOperand = result;
      secondOperand = '';
      operator = '';
      waitingForSecondOperand = false;
    }
    return;
  }

  if (value === 'clear') {
    firstOperand = '';
    secondOperand = '';
    operator = '';
    waitingForSecondOperand = false;
    updateDisplay('');
    return;
  }
});

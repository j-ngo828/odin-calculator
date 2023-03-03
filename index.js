const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "*";
const DIVIDE = "/";
const EQUAL = "=";
const CLEAR = "clear";

const calculator = {
  operand1: null,
  operand2: null,
  operator: null,
  result: null,
};

function add(op1, op2) {
  return op1 + op2;
}

function subtract(op1, op2) {
  return op1 - op2;
}

function multiply(op1, op2) {
  return op1 * op2;
}

function divide(op1, op2) {
  return op1 / op2;
}

function operate(operator, op1, op2) {
  switch (operator) {
    case ADD:
      return add(op1, op2);
    case SUBTRACT:
      return subtract(op1, op2);
    case MULTIPLY:
      return multiply(op1, op2);
    case DIVIDE:
      return divide(op1, op2);
  }
}

function clearCalculator() {
  calculator.operator = null;
  calculator.operand1 = null;
  calculator.operand2 = null;
}

function main() {
  const inputButtons = [...document.querySelectorAll("button")];
  const operandButtons = inputButtons.filter((button) =>
    button.hasAttribute("data-number")
  );
  const operatorButtons = inputButtons.filter((button) =>
    button.hasAttribute("data-operator")
  );
  const result = document.querySelector(".result");
  operandButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (!calculator.operand1) {
        calculator.operand1 = parseInt(event.target.dataset.number);
      } else if (!calculator.operand2) {
        calculator.operand2 = parseInt(event.target.dataset.number);
      }
      console.table(calculator);
    });
  });
  operatorButtons
    .filter(
      (button) =>
        button.dataset.operator !== EQUAL && button.dataset.operator !== CLEAR
    )
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        if (
          !calculator.operator &&
          (calculator.operand1 !== null || calculator.operand2 !== null)
        ) {
          calculator.operator = event.target.dataset.operator;
        }
        console.table(calculator);
      });
    });
  const equalButton = operatorButtons.find(
    (button) => button.dataset.operator === EQUAL
  );
  equalButton.addEventListener("click", (event) => {
    if (!calculator.operand1 && !calculator.operand2 && !calculator.operator) {
      return;
    }
    result.textContent = operate(
      calculator.operator,
      calculator.operand1,
      calculator.operand2
    );
    clearCalculator();
  });

  const clearButton = operatorButtons.find(
    (button) => button.dataset.operator === CLEAR
  );
  clearButton.addEventListener("click", (event) => {
    clearCalculator();
  });
}

main();

const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "*";
const DIVIDE = "/";
const EQUAL = "=";
const CLEAR = "clear";

const operatorMap = {
  [ADD]: "&plus;",
  [SUBTRACT]: "&minus;",
  [MULTIPLY]: "&times;",
  [DIVIDE]: "&divide;",
};

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
  calculator.result = null;
}

function renderOperation() {
  const operationElem = document.querySelector(".operation");
  let operation = "";

  if (calculator.operand1 !== null) {
    operation += `${calculator.operand1}`;
  }
  if (calculator.operator !== null) {
    operation += ` ${calculator.operator} `;
  }
  if (calculator.operand2 !== null) {
    operation += `${calculator.operand2}`;
  }
  operationElem.innerText = operation;
  operationElem.innerHTML = operationElem.innerHTML.replace(
    calculator.operator,
    operatorMap[calculator.operator]
  );
}

function renderResult() {
  const result = document.querySelector(".result");
  result.textContent = calculator.result;
}

function main() {
  const inputButtons = [...document.querySelectorAll("button")];
  const operandButtons = inputButtons.filter((button) =>
    button.hasAttribute("data-number")
  );
  const operatorButtons = inputButtons.filter((button) =>
    button.hasAttribute("data-operator")
  );
  operandButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (!calculator.operand1) {
        calculator.operand1 = event.target.dataset.number;
      } else if (calculator.operator !== null && !calculator.operand2) {
        calculator.operand2 = event.target.dataset.number;
      } else if (!calculator.operator && calculator.operand1 !== null) {
        if (calculator.operand1 === "0") {
          return;
        }
        calculator.operand1 += event.target.dataset.number;
      } else if (calculator.operator !== null && calculator.operand2 !== null) {
        if (calculator.operand2 === "0") {
          return;
        }
        calculator.operand2 += event.target.dataset.number;
      }
      renderOperation();
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
        renderOperation();
      });
    });

  const equalButton = operatorButtons.find(
    (button) => button.dataset.operator === EQUAL
  );
  equalButton.addEventListener("click", (event) => {
    if (!calculator.operand1 && !calculator.operand2 && !calculator.operator) {
      return;
    }
    calculator.result = operate(
      calculator.operator,
      calculator.operand1,
      calculator.operand2
    );
    renderResult();
    clearCalculator();
  });

  const clearButton = operatorButtons.find(
    (button) => button.dataset.operator === CLEAR
  );
  clearButton.addEventListener("click", (event) => {
    clearCalculator();
    renderOperation();
    renderResult();
  });
}

main();

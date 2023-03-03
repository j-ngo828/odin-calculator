const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "*";
const DIVIDE = "/";

const calculator = {
  operand1: null,
  operand2: null,
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

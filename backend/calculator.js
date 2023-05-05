module.exports = { calculate }

function calculate(expression) {
    if (!validateCalculation(expression)) return "Masukkan ekspresi tidak valid";
    const operands = [];
    const operators = [];

    // Split number and math symbol (+ - * /)
    const tokens = expression.match(/\d+|\+|\-|\*|\//g);

    tokens.forEach(token => {
        if (!isNaN(token)) {
            operands.push(Number(token));
        } else {
            switch (token) {
                case '(':
                    operators.push(token);
                    break;
                case ')':
                    while (operators[operators.length - 1] !== '(') {
                        const operator = operators.pop();
                        const operand2 = operands.pop();
                        const operand1 = operands.pop();
                        const result = evaluate(operand1, operand2, operator);
                        operands.push(result);
                    }
                    operators.pop();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    while (operators.length > 0 && getPrecedence(operators[operators.length - 1]) >= getPrecedence(token)) {
                        const operator = operators.pop();
                        const operand2 = operands.pop();
                        const operand1 = operands.pop();
                        const result = evaluate(operand1, operand2, operator);
                        operands.push(result);
                    }
                    operators.push(token);
                    break;
                default:
                    throw new Error('Invalid operator');
            }
        }
    });

    while (operators.length > 0) {
        const operator = operators.pop();
        const operand2 = operands.pop();
        const operand1 = operands.pop();
        const result = evaluate(operand1, operand2, operator);
        operands.push(result);
    }

    return operands.pop();
}

function getPrecedence(operator) {
    switch (operator) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return 0;
    }
}

function evaluate(operand1, operand2, operator) {
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
        default:
            throw new Error('Invalid operator');
    }
}

function validateCalculation(expression) {
    const operators = ['+', '-', '*', '/'];
    const digits = '0123456789';
    const parentheses = ['(', ')'];
    const stack = [];

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (digits.includes(char)) {
            // if it's a digit, continue to the next character
            continue;
        } else if (operators.includes(char)) {
            // if it's an operator, check if the previous and next characters are digits
            const prevChar = expression[i - 1];
            const nextChar = expression[i + 1];
            if (!digits.includes(prevChar) || !digits.includes(nextChar)) {
                return false;
            }
        } else if (parentheses.includes(char)) {
            // if it's a parenthesis, add it to the stack
            if (char === '(') {
                stack.push(char);
            } else {
                // if it's a closing parenthesis, check if the last opening parenthesis on the stack matches it
                const lastOpenParenthesis = stack.pop();
                if (lastOpenParenthesis !== '(') {
                    return false;
                }
            }
        } else {
            // if it's not a digit, operator, or parenthesis, return false
            return false;
        }
    }

    // if the stack is not empty, there are unmatched opening parentheses
    if (stack.length > 0) {
        return false;
    }

    // if we've made it this far, the expression is valid
    return true;
}


/*
// Input output 
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculator() {
    rl.question('Soal : ', (calcString) => {
        try {
            const result = calculate(calcString);
            console.log(`Hasil perhitungan: ${result}`);
        } catch (error) {
            console.log('Terjadi kesalahan: ' + error);
        }
    });
}

calculator();
*/

/**
 * Pembanding :
 * eval()
 */
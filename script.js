let operatorArr = []
let operand1;
let operand2;
let numberInputStatus = true;
let eventStatusCalc = 0;
let eventStatusEquals=0;
let newNumberCounter=0;

let display = document.querySelector(".display")
let btnContainerDiv = document.querySelector("#btnContainerDiv")

btnContainerDiv.addEventListener("click", btnEventHandler)

function btnEventHandler(event) {
    let target = event.target;
    switch (target.id) {
        case "zeroBtn":
        case "oneBtn":
        case "twoBtn":
        case "threeBtn":
        case "fourBtn":
        case "fiveBtn":
        case "sixBtn":
        case "sevenBtn":
        case "eightBtn":
        case "nineBtn":
            numberInput(target.textContent)
            break;
        case "additionBtn":
        case "subtractionBtn":
        case "multiplicationBtn":
        case "divisionBtn":
            if (eventStatusCalc === 0) {
                operate(target.textContent);
                eventStatusCalc++;
            }
            else {
                return;
            }
            break;
        case "equalBtn":
            if (eventStatusEquals === 0&&eventStatusCalc === 0) {
                operate(target.textContent);
                eventStatusEquals++;
            }
            else {
                return;
            }
            break;
        case "decimalBtn":
            decimalPoint();
            break;
        case "signBtn":
            sign();
            break;
        case "delBtn":
            del();
            break;
        case "clearBtn":
            clear();
            break;
    }
}

function numberInput(input) {
    eventStatusCalc = 0;
    eventStatusEquals=0;

    if (numberInputStatus === true) {
        newNumberCounter++;
        display.textContent = input;
        numberInputStatus = false;
    }
    else {
        switch (input) {
            case "0":
                if (display.textContent === "0") {
                    break;
                }
                else {
                    display.textContent += input;
                    break;
                }
            default:
                display.textContent += input;
        }
    }
}

function operate(str) {
    operatorArr.push(str);
    numberInputStatus = true;

    if(operatorArr.at(-2) === "="&&newNumberCounter===0){
        operand1 = display.textContent;
        return;
    }
    else if (operatorArr.length === 1 || operatorArr.at(-2) === "="&&newNumberCounter===1) {
        operand1 = display.textContent;
        console.log(operand1,operand2);
        newNumberCounter--;
        return;
    }
    else {
        operand2 = display.textContent;
        newNumberCounter--;
    }

    switch (operatorArr.at(-2)) {
        case "+":
            operand1 = add(operand1,operand2);
            break;
        case "-":
            operand1 = subtract(operand1, operand2);
            break;
        case "x":
            operand1 = multiply(operand1, operand2);
            break;
        case "\u00F7":
            operand1 = divide(operand1, operand2);
            break;
    }
}

function add(a, b) {
    let result = +a + +b
    console.log(a,operatorArr.at(-2), b, result);
    display.textContent = result;
    return result;
}

function subtract(a, b) {
    let result = a - b
    console.log(a,operatorArr.at(-2), b, result);
    display.textContent = result;
    return result;
}

function multiply(a, b) {
    let result = a * b
    console.log(a,operatorArr.at(-2), b, result);
    display.textContent = result;
    return result;
}

function divide(a, b) {
    if (operand2 == "0") {
        clear();
        alert("GOTCHA!!!");
        console.table(operand1, operand2, operatorArr, numberInputStatus, eventStatusCalc,eventStatusEquals)
        return;
    }
    else {
        let result = a / b
        console.log(a,operatorArr.at(-2), b, result);
        display.textContent = result;
        return result;
    }
}

function decimalPoint() {
    eventStatusCalc = 0;
    eventStatusEquals=0;

    if (numberInputStatus === true) {
        newNumberCounter++;
        display.textContent = "0.";
        numberInputStatus = false;
    }
    else {
        if(display.textContent.includes(".")){
            return;
        }
        else display.textContent += ".";
    }    
}

function clear() {
    display.textContent = "";
    operand1 = "filler";
    operand2 = "filler";
    numberInputStatus = true;
    eventStatusCalc = 0;
    eventStatusEquals=0;
    operatorArr = [];
}

function del() {
    let a = display.textContent.length
    display.textContent = display.textContent.slice(0, a - 1);
}

function sign() {
    let a = display.innerText.length
    if (display.textContent.charAt(0) === "-") {
        display.textContent = display.textContent.slice(1, a)
    }
    else {
        display.textContent = display.textContent.padStart(a + 1, "-")

    }
}


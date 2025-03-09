
const numbers = document.querySelectorAll(".numbers button");
const operators = document.querySelectorAll(".operators button");
const input = document.querySelector('#input');
const clear= document.querySelector("#clear");
const result = document.querySelector("#result");
resultDisplayed = false;
// display numbers
numbers.forEach(number =>{
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];
    number.addEventListener("click", e => {
        if(resultDisplayed === false){
            input.innerHTML += e.target.innerHTML;
        }else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷"){
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        }else{
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }
        
    })
});
// display operators
operators.forEach(operator =>{
    operator.addEventListener("click", e => {
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];
        
        if(lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷"){
            let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        }else if(currentString === 0){
            console.log("enter a number first");
        }else{
            input.innerHTML += e.target.innerHTML;
        }
    })
});
// result event
result.addEventListener("click", ()=>{
    let inputString = input.innerHTML;
    let numbers = inputString.split(/\+|\-|\×|\÷/g);
    let operators = inputString.replace(/[0-9]|\./g, "").split("");


    // DIVIDE
    let divide = operators.indexOf("÷");
    while (divide != -1) {
      numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
      operators.splice(divide, 1);
      divide = operators.indexOf("÷");
    }
    // MULTIPLY
    let multiply = operators.indexOf("×");
    while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
    }
    // SUBTRACT
    let subtract = operators.indexOf("-");
    while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
    }
    // ADD
    let add = operators.indexOf("+");
    while (add != -1) {
    numbers.splice(add, 2, parseInt(numbers[add]) + parseInt(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
    }
    

    input.innerHTML = numbers[0]; // displaying output
  
    resultDisplayed = true; // turning flag if result is displayed
 
});
// clear event
clear.addEventListener("click", function() {
    input.innerHTML = "";
})
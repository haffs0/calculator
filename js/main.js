console.log('welcome home')
//select input
const input = document.querySelector('#input');
input.focus();
//calculator object
function Calculator (previousValue, currentValue, operator) {
    this.previousValue = previousValue;
    this.currentValue = currentValue;
    this.operator = operator;
}

//arithmetic operations and percentage
Calculator.prototype.operations = function() {
    let answer;
    switch(this.operator) {
        case "+":
            console.log('here')
            answer = this.previousValue + this.currentValue;
            return answer;
        case "-":
            console.log('here')
            answer = this.previousValue - this.currentValue;
            return answer;
        case "*":
            console.log('here')
            answer = this.previousValue * this.currentValue;
            return answer;
        case "/":
            console.log('here')
            answer = this.previousValue / this.currentValue;
            return answer;
        case "%":
            const a = this.previousValue / 100;
            const b = a * this.currentValue;
            return b;
    }
}

/*** Square root operation.*/
Calculator.prototype.squareRoot = function() {
    const answer = Math.sqrt(this.previousValue) ;
    return answer;
}

/*** Reciprocal operation*/
Calculator.prototype.reciprocal = function() {
    let answer =  1 / this.previousValue;
    return answer;
}

/*** square operation*/
Calculator.prototype.square = function() {
    let answer =  this.previousValue * this.previousValue; 
    return answer;
}

const validateInput = (event) => {
    const check = event.charCode >= 48 && event.charCode <= 57;
    return check || event.key == '.' || event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/'; 
}
//checking for correct input value
const smartInput = (event) => {
    event.stopPropagation();
    const dataValue = event.target.dataset.value;
    let operator = ['*', '-', '/', '+', '%']
    let inputValue;
    let newCalculation, result;
    let previousValue =  input.value;
    
    //add number to the input field
    if(dataValue=='0'||dataValue=='1'|| dataValue=='2'|| dataValue=='3'|| dataValue=='4'|| dataValue=='5'|| dataValue=='6'|| dataValue=='7'|| dataValue=='8'|| dataValue=='9'){
        input.value = input.value + dataValue;
    }

    if(input.value != "") {
        if(dataValue === "negation" ){
            checkForNegation(input.value) ? input.value = previousValue.slice(1,) : input.value = '-' + previousValue;
        }
        if(dataValue=='/'||dataValue=='*'|| dataValue=='-'|| dataValue=='+'|| dataValue=='.' || dataValue=='%') {
            input.value = input.value + dataValue;
        }
    }


    //special operation
    switch(dataValue) {
        case "square root":
            previousValue.indexOf('.') ? previousValue = parseFloat(previousValue) : previousValue = parseInt(previousValue, 10);
            newCalculation = new Calculator(previousValue);
            result = newCalculation.squareRoot();
            input.value = ""
            input.value = String(result);
            break;
        case "squares":
            previousValue.indexOf('.') ? previousValue = parseFloat(previousValue) : previousValue = parseInt(previousValue, 10);
            newCalculation = new Calculator(previousValue);
            result = newCalculation.square();
            input.value = ""
            input.value = String(result);
            break;
        case "fraction":
            previousValue.indexOf('.') ? previousValue = parseFloat(previousValue) : previousValue = parseInt(previousValue, 10);
            newCalculation = new Calculator(previousValue);
            result = newCalculation.reciprocal();
            input.value = ""
            input.value = String(result);
            break;
        case "delete":
            input.value = "";
            break;
        case "backspace":
            const len = previousValue.length;
            input.value = previousValue.slice(0, len - 1);
            break;
    }

    // when the equal sign is pressed it display the result
    if(dataValue === '=') {
        inputValue = input.value;
        operator.forEach(element => { 
            // console.log(element)
            let find = inputValue.indexOf(element);
            if(find !='-1') {
                console.log('here')
                const arrayValue = inputValue.split(element);
                const operatorValue = element;
                console.log(operatorValue);
                let [a, b] = arrayValue;
                a.indexOf('.') ? a = parseFloat(a) : a = parseInt(a, 10);
                b.indexOf('.')? b = parseFloat(b) : parseInt(b, 10);
                newCalculation = new Calculator(a, b, operatorValue);
                result = newCalculation.operations();
                input.value = ""
                input.value = String(result);
            }
        })
    }
   
}

//checking input value 
const checkForNegation = (msg) => {
    return(msg.search('-') !== -1)
}



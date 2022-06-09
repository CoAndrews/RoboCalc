//making a class for this calculator

class Calculator {
    //our constructor is going to contain our previous and current set of numbers
    //where our display text is placed for our operator
    constructor(previousOperandText, currentOperandText){
        //setting variables for this class
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }
    //setting our functions for the operators i.e. division subtractions etc. 
    //since this needs to remove all the values we have, we must list them in the clear function
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined

    }
    delete(){
        //The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end. If this value is not specified, the substring continues to the end of stringObj.
        //Returns a section of a string.
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    //this function passes the number the user selected
    appendNum(number){
        //this for loop stops the period button from being pressed more than once
        //if we type period and we already have it then it should restrict us 

        if (number === '.' && this.currentOperand.includes('.')) return
        //allows numbers to be as long as possible and not seperate
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }
    //will show what operand the user has selected 

    chooseOperation(operation){
        //if the current display is empty it remains empty if an operand is applied
        if(this.currentOperand === '') return
        //if the previous operand is not equal to an empty string then it will call the compute function
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        //we are done typing the old number and the current operand is clear
        this.previousOperand = this.currentOperand
        this.currentOperand = ' '

    }
// this will be our solvant function
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        //my switch statment allows me to creat multiple switch staments on .operation when it equals a + or / or *
        switch (this.operation) {
            case '+' :
                computation = prev + current
                break
                case '-' :
                computation = prev - current
                break
                case '*' :
                computation = prev * current
                break
                case '/' :
                computation = prev / current
                break
            default: 
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        //this will take the string and turn it into an array
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    //update the values inside our diplay box
    updateDisplay(){
        this.currentOperandText.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandText.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandText.innerText = ''
        }
      }
        

    }


    
//in order to select data attributes I have to call it in a ('[]')
//query selector all is for multiple buttons
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operand]');

//for individually classed buttons i only used .querySelector, for data classed buttons that arent segregated i use .query selector
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')

const calculator = new Calculator( previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    //whenever we click on a button we want something to happen
    button.addEventListener('click', () => {
        //something occurs every time a number is selected
        calculator.appendNum(button.innerText)
        //we want to call update display after we select any number
        calculator.updateDisplay()
    })
})

//now we have to create a function for our operation buttons to be selected as well
operationButtons.forEach(button => {
    //whenever we click on a button we want something to happen
    button.addEventListener('click', () => {
        //something occurs every time a number is selected
        calculator.chooseOperation(button.innerText)
        //we want to call update display after we select any number
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
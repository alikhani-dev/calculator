const calcDisplay = document.getElementById('calcDisplay')
const operators = ['+', '-', '*', '/', '%', '^']
let checkPow = false

//! --- validation value sending
function validation (e) {
  const { value } = calcDisplay
  //? filter operator start
  if (value.length === 0) {
    for (const operator of operators) {
      if (e != '-') {
        if (operator == e) return false
      }
    }
  }
  //? filter two operator
  if (value.length >= 1) {
    const lastChar = value[value.length - 1]
    for (const operator of operators) {
      if (lastChar == operator) {
        for (const operator_2 of operators) {
          if (operator_2 == e) {
            return false
          }
        }
      }
    }
  }
  //? filter two zero
  if (value.length == 1 && value[0] == 0 && e == '0') {
    return false
  }
  //? filter two dot
  if (value.length >= 1) {
      
  }

  return e
}

//! ------- Method Math  -------
function math (e) {
  const { value } = calcDisplay
  if (checkEnd() && value) {
    if (e == 'pow') {
      checkPow = true
      if (value.length !== 0) {
        calcDisplay.value += '^'
      }
    } else {
      calcDisplay.value = Math[e](eval(value))
    }
  }
}

//! ------- Calculate -------
function calculate () {
  const { value } = calcDisplay
  let pow = checkPow ? value.split('^') : null
  if (checkEnd() && value) {
    if (pow) {
      calcDisplay.value = Math.pow(eval(pow[0]), eval(pow[1]))
      checkPow = false
    } else {
      calcDisplay.value = eval(value)
    }
  }
}

//! ------- check not exist operator last character -------
function checkEnd () {
  for (const operator of operators) {
    if (calcDisplay.value.endsWith(operator)) {
      return false
    }
  }
  return true
}

//! ------- Add to calculator -------
function addToCalculator (e) {
  const result = validation(e)
  if (result) {
    calcDisplay.value += result
  }
}

//! ------- backSpace in keybord -------
function backSpace () {
  calcDisplay.value = calcDisplay.value.slice(0, -1)
}

//! ------- remove value in display -------
function clearDisplay () {
  calcDisplay.value = ''
}

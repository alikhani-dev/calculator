const calcDisplay = document.getElementById('calcDisplay')
const oprator = ['+', '-', '*', '/', '%', '^']
let checkPow = false
//! --- validation value sending
function validation (e) {
  for (const item of oprator)
    if (calcDisplay.value.startsWith('0') && e === item) return e
  if (
    (calcDisplay.value.endsWith('.') && e === '.') ||
    (calcDisplay.value.startsWith('0') &&
      (e == 0 || e !== '.') &&
      calcDisplay.value[1] === undefined)
  ) {
    backSpace()
    return e
  }
  for (const eitem of oprator)
    for (const item of oprator)
      if (
        (calcDisplay.value.endsWith(item) && e == eitem) ||
        (calcDisplay.value.length === 0 && e == item)
      )
        return false
  return e
}
//! --- Add to calculator (for Number and Oprator)
function addToCalculator (e) {
  validation(e) && (calcDisplay.value += validation(e))
}
//! --- Check End display for not exsist oprator
function checkEnd () {
  for (const item of oprator) if (calcDisplay.value.endsWith(item)) return false
  return true
}
//! --- Method Math  ---
function math (e) {
  if (checkEnd()) {
    if (e === 'pow') {
      checkPow = true
      if (calcDisplay.value.length !== 0) calcDisplay.value += '^'
    } else if (
      (e === 'sqrt' && !String(calcDisplay.value).startsWith('-')) ||
      e !== 'sqrt'
    )
      if (eval(calcDisplay.value))
        calcDisplay.value = Math[e](eval(calcDisplay.value))
      else calcDisplay.value = 0
  }
}
//! ------- Calculate -------
function clac () {
  let pow = checkPow ? calcDisplay.value.split('^') : null
  if (calcDisplay.value && checkEnd())
    for (const item of oprator)
      if (
        calcDisplay.value.includes(item) &&
        !calcDisplay.value.endsWith(item + '.')
      )
        if (pow) {
          calcDisplay.value = Math.pow(eval(pow[0]), eval(pow[1]))
          checkPow = false
        } else calcDisplay.value = eval(calcDisplay.value)
}
//! ------- backSpace in keybord -------
function backSpace () {
  calcDisplay.value = calcDisplay.value.slice(0, -1)
}
//! ------- delete in keybord -------
function del () {
  calcDisplay.value = null
}
const DISPLAY_TEXT = document.getElementById('displayText');
const CALC_TEXT = document.getElementById('calcText');

DISPLAY_TEXT.textContent = '';
CALC_TEXT.textContent = '';

let x, y;
let result = undefined;

document.querySelectorAll('.numbtn').forEach(function(numBtn) {
  numBtn.addEventListener('click', function (e) {
    if (DISPLAY_TEXT.textContent == result || containsInvalid()) {
      DISPLAY_TEXT.textContent = '';
      CALC_TEXT.textContent = '';
      result = undefined;
    }

    if (containsInvalid()) {
      result = 0;
    }

    if (numBtn.textContent == '0' && DISPLAY_TEXT.textContent == '0') {
      DISPLAY_TEXT.textContent += '';
      return;

    } else if (numBtn.textContent == '.' && containsDecimal()) {
      DISPLAY_TEXT.textContent += '';
      return;

    } else if (numBtn.textContent == '.' && displayEmpty()) {
      DISPLAY_TEXT.textContent = '0.';
      return;

    } else if (numBtn.textContent != '.' && DISPLAY_TEXT.textContent == '0') {
      DISPLAY_TEXT.textContent = '';

    }
    DISPLAY_TEXT.textContent += numBtn.textContent;
  })
})


document.querySelectorAll('.opbtn').forEach(function(opBtn) {
  opBtn.addEventListener('click', function (e) {
    if (!calcContainsOp()) {
      if (!displayEmpty() && !containsInvalid() && !resultInvalid()) {
        if (DISPLAY_TEXT.textContent[DISPLAY_TEXT.textContent.length - 1] == '.') {
          CALC_TEXT.textContent = DISPLAY_TEXT.textContent + `0 ${opBtn.value} `;
        } else {
          CALC_TEXT.textContent = DISPLAY_TEXT.textContent + ` ${opBtn.value} `;
        }
        DISPLAY_TEXT.textContent = '';        
      }
    } else {
      if (displayEmpty()) {
        CALC_TEXT.textContent = calcNumbersContent() + ` ${opBtn.value} `;
      } 
    }
  })
})


document.querySelectorAll('.calcbtn').forEach(function(calcBtn) {
  calcBtn.addEventListener('click', function (e) {
    if (!displayEmpty()) { 
      if (CALC_TEXT.textContent != '' && !containsInvalid() && !resultInvalid()) {
        let operator = CALC_TEXT.textContent.replace(/[0-9.=\s\-]+/g, '');
              console.log("operator: " + operator);

        if (DISPLAY_TEXT.textContent != result && !containsInvalid()) {
          x = parseFloat(calcNumbersContent());
          y = parseFloat(DISPLAY_TEXT.textContent);
        }

        console.log("x: " + x);
        console.log("y: " + y);

        switch (operator) {
          default:
            return;
          case "+":
            result = calcAdd(x, y);
            break;
          case "–":
            result = calcSubtract(x, y);
            break;
          case "x":
            result = calcMultiply(x, y);
            break;
          case "/":
            result = calcDivide(x, y);
            break;
        }
        
        console.log("result: " + result);
        
        if (calcBtn.textContent == '=') {
          if (containsInvalid() || resultInvalid()) {
            DISPLAY_TEXT.textContent = result;
            CALC_TEXT.textContent = '';
            result = undefined;
          } else {
            DISPLAY_TEXT.textContent = result; 
            CALC_TEXT.textContent = `${x} ${operator} ${y} =`;
          }
        } else {
          if (containsInvalid() || resultInvalid()) {
            DISPLAY_TEXT.textContent = result;
            CALC_TEXT.textContent = '';
            result = undefined;
          } else {
            DISPLAY_TEXT.textContent = '';
            CALC_TEXT.textContent = result + ` ${calcBtn.value} `;
          }
        }
      }
    }
  })
})


document.getElementById('clear').onclick = () =>{
  DISPLAY_TEXT.textContent = '';
  CALC_TEXT.textContent = '';
  result = undefined;
}


document.getElementById('backspace').onclick = () =>{
  if (DISPLAY_TEXT.textContent == result || containsInvalid()) {
      DISPLAY_TEXT.textContent = '';
      CALC_TEXT.textContent = '';
      result = undefined;
    }

  if (DISPLAY_TEXT.textContent != '') {
    DISPLAY_TEXT.textContent = DISPLAY_TEXT.textContent.slice(0, -1);
  }
}

function containsInvalid() {
  return (DISPLAY_TEXT.textContent == 'Infinity' || DISPLAY_TEXT.textContent == 'NaN');
}

function resultInvalid() {
  return (result == 'Infinity' || result !== result);
}

function containsDecimal() {
  let periodCount = (DISPLAY_TEXT.textContent.match(/\./g) || []).length;
  return (periodCount > 0);
}

function displayEmpty() {
  return (DISPLAY_TEXT.textContent == '');
}

function calcContainsOp() {
  return (CALC_TEXT.textContent.replace(/[0-9.=\s\-]+/g, '') != '');
}

function calcNumbersContent() {
  return CALC_TEXT.textContent.match(/-?\d+(\.\d+)?/g).join('');
}


function calcAdd(x, y) {
  return (x + y);
}

function calcSubtract(x, y) {
  return (x - y);
}

function calcMultiply(x, y) {
  return (x * y);
}

function calcDivide(x, y) {
  return (x / y);
}

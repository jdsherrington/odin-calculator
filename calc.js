const DISPLAY_TEXT = document.getElementById('displayText');
const CALC_TEXT = document.getElementById('calcText');

DISPLAY_TEXT.textContent = '';
CALC_TEXT.textContent = '';

let mainDisplay = '',
    subDisplay = '',
    buffer = '',
    numpad = new Object();


document.querySelectorAll('.numbtn').forEach(function(numBtn) {
  numBtn.addEventListener('click', function (e) {
    if (numBtn.textContent == '0' && DISPLAY_TEXT.textContent == '0') {
      DISPLAY_TEXT.textContent += '';
    } else {
      if (DISPLAY_TEXT.textContent == '0') {
        DISPLAY_TEXT.textContent = ''
      }
      DISPLAY_TEXT.textContent += numBtn.textContent;
    }
  })
})


document.querySelectorAll('.opbtn').forEach(function(opBtn) {
  opBtn.addEventListener('click', function (e) {
    if (DISPLAY_TEXT.textContent != '' && DISPLAY_TEXT.textContent != '0') {
      if (CALC_TEXT.textContent.slice(-1) != ' ') {
        CALC_TEXT.textContent = DISPLAY_TEXT.textContent;
        DISPLAY_TEXT.textContent = '';     
      } else {
        CALC_TEXT.textContent = CALC_TEXT.textContent.match(/\d+/g)

      }
      CALC_TEXT.textContent += ` ${opBtn.value} `;
    }
  })
})


document.querySelectorAll('.calcbtn').forEach(function(calcBtn) {
  calcBtn.addEventListener('click', function (e) {
    if (DISPLAY_TEXT.textContent != '') {
      let operator = CALC_TEXT.textContent.replace(/[0-9\s]/g, '');
      console.log(operator);

      let result,
          x = parseInt(CALC_TEXT.textContent.match(/\d+/g)),
          y = parseInt(DISPLAY_TEXT.textContent);

      console.log(x);
      console.log(y);

      switch (operator) {
        case "+":
          result = calcAdd(x, y);
          break;
        case "-":
          result = calcSubtract(x, y);
          break;
        case "x":
          result = calcMultiply(x, y);
          break;
        case "/":
          result = calcDivide(x, y);
          break;
      }
      
      if (calcBtn.textContent == '=') {
        DISPLAY_TEXT.textContent = result;
        CALC_TEXT.textContent = '';
      } else {
        DISPLAY_TEXT.textContent = '';
        CALC_TEXT.textContent = result + ` ${calcBtn.value} `;
      } 
    }
  })
})


document.getElementById('clear').onclick = () =>{
  DISPLAY_TEXT.textContent = '';
  CALC_TEXT.textContent = '';
}


document.getElementById('backspace').onclick = () =>{
  if (DISPLAY_TEXT.textContent != '') {
    DISPLAY_TEXT.textContent = DISPLAY_TEXT.textContent.slice(0, -1);
  }
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
  // if (isNan(x / y)) {
  //   return "Infinity";
  // }
  return (x / y);
}

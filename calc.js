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
      enterNumber(numBtn);
    })
  })

function enterNumber(numBtn) {  
  if (numBtn.textContent == '0' && buffer == '0') {
    buffer += '';
  } else {
    if (buffer == '0') {
       buffer = '';
    } 
    buffer += numBtn.textContent;
  }
  DISPLAY_TEXT.textContent = buffer;
  CALC_TEXT.textContent = buffer;
}

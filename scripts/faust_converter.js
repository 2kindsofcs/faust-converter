const conversion_result = document.querySelector('.conversion_result');
const message = document.querySelector('.message');
const sojusubmit = document.querySelector('.sojusubmit');
const input_sojuG = document.querySelector('.input_sojuG');
const input_sojuB = document.querySelector('.input_sojuB');
const soju_ABV = 17
const faust_al = ((30 * 0.4) + (30 * 0.755) + (15 * 0.2))
let result_faust; 
let resetButton;

function alcoholCal() {
  if (Number(input_sojuG.value) >=0 && Number(input_sojuB.value) >= 0){
    let soju_G_volume = Number(input_sojuG.value) * 50
    let soju_B_volume = Number(input_sojuB.value) * 360
    result_faust = ((soju_G_volume + soju_B_volume) * soju_ABV * 0.01) / faust_al
    conversion_result.textContent = `계산 결과: 약 ${result_faust.toFixed(1)}파우스트입니다.`;
  }
  if (result_faust >= 4) {
    message.textContent = '당신의 간, 괜찮으십니까?';
    message.style.backgroundColor = 'red';
  }
  blockSubmit();
}
sojusubmit.addEventListener('click', alcoholCal);

function blockSubmit() {
  input_sojuG.disabled = true;
  input_sojuB.disabled = true;
  sojusubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = '다시 계산하기';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', reset);
}
function reset() {
  const resetParas = document.querySelectorAll('.resultParas p');
  for(let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }
  resetButton.parentNode.removeChild(resetButton); //document.body를 써도 똑같이 작용하나? 왜 parentNode를 쓰지?
  input_sojuG.disabled = false;
  input_sojuB.disabled = false;
  sojusubmit.disabled = false;
  input_sojuG.value = '';
  input_sojuB.value = '';
  input_sojuG.focus();
  input_sojuG.focus();
}
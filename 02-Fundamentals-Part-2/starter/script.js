//********************Strict mode */
"use strict"; //activate strict mode //has to be first in the script
// accidental error . 에러 발견을 쉽게 해줌. 디버깅을 쉽게 해줌. Show visible error.
// 항상 strict mode 를 on 할 것.!!
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true; // 오타 발생. strict mode가 아니라면 이러한 에러를 발견할 수 없음.
if (hasDriversLicense) console.log("I can drive :D");

const interface = "Audio"; //reserved word. 예약어 사용. -> strict mode가 잡아냄.

console.log(interface);

const private = 534; //마찬가지로 예약어.
const if = 23;
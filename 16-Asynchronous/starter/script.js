'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const p = document.querySelector('.simple_p');

///////////////////////////////////////
setTimeout(function () {
  p.textContent = 'My name is Dohyun';
}, 5000);

p.style.color = 'red';

// Ajax 는 Async javascript and xml. but xml은 옛 방식이고 요즘은 전부 json을 주고받음.
// Callback funtion 이나 eventListener는 그 자체로 절때 async를 유발하지 않는다!!
// (예를들어 이미지 로드 후 load 에 따른 이벤트리스너를 정의한다면, 이미지가 로딩되는 자체가 async지, 이벤트리스터가 async가 아니다.)

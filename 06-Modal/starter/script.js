'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
// const btnsOpenModal = document.querySelector('.show-modal'); // 항상 첫번째 element만 선택됨.
const btnsOpenModal = document.querySelectorAll('.show-modal'); // 항상 첫번째 element만 선택됨.

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//OpenModal
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

//CloseModal
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//Keyboard Event(Global Event)
//document의 모든 것에서 event를 감지.
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal(); // ()를 사용하면 읽는 즉시!!!! function 실행.
    // () 없이 그냥 closeModal 하면, 이벤트가 발생 시에만 function 실행.
    // (parameter로 function을 정의하는 것이므로 소괄호 없이 작성!!!)
    // () 는 call의 의미를 갖고있음.
  }
});

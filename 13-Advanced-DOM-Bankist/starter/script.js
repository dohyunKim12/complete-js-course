'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// LECTURES

// Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
// HTML Collections
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
// .insertAdjacentHTML // 가장 쉽게 create 할 수 있는 방법중 하나.
// 아래와 같이 다른 방법들...도 많음.
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.'
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie" > Got it!</button>';

// header.prepend(message); // header의 첫번째 자식
// header.append(message); // header의 마지막 자식
// 둘 중 하나만 가능함. (동시에 불가)
// header.append(message.cloneNode(true)); // 이렇게 하면 여러개 가능.
// header.before(message); // header와 형제, header 이전에 삽입.
header.after(message); // header와 형제, header 이후에 삽입.

// Delete elemnents
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message); // remove 메서드가 없으면 이런방식으로 해야함.
  });

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height);
console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; // 이러한 동작은 header의 자식이 아닌 sibling으로 있을때만 가능함.

document.documentElement.style.setProperty('--color-primary', 'orange');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); // absolute URL
console.log(logo.getAttribute('src')); // relative URL
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // absolute URL
console.log(link.getAttribute('href')); // relative URL

// Data attributes
console.log(logo.dataset.versionNumber); // dataset 메서드는 data로 시작하는 attribute값 return. 이때 camelCase에 유의!

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c', 'j');
logo.classList.contains('c', 'j'); // Not includes

// Don't use. Because it will override
// logo.className = 'Dohyun';

console.log(logo.classList);

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect()); // 이 때의 x, y 값은 현재 내가 보고있는 창(viewPort)를 기반으로 함.
  // 이 말인 즉슨, 현재 스크롤 위치도 조정할 수 있다는 뜻!

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling (3 ways)
  // window.scrollTo(//left position, //Top position);
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset, // left와 top을 이렇게 계산한다는 것을 반드시 기억할것!!
  //   s1coords.top + window.pageYOffset
  // );

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // section1.scrollIntoView({ behavior: 'smooth' }); // 제일 간편한 방식.
});

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  // h1.removeEventListener('mouseenter', alertH1); // remove 가 가능하려면, function을 named function으로 만들어야함.
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); // 3초 후 remove.
// h1.onmouseenter = function (e) { // OLD School..
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());

// Event handling -> Bubbling phase 가 default임. (Not capturing phase. capturing phase시 third parameter를 true로..)
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); //Target == Where the click happend
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation(); // event bubbling 현상을 제거. (parent element까지 가지 않는다.)
  // But not good idea.
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget); //Target ==  Where the click happend
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget); //Target ==  Where the click happend.
    // currentTarget == Where the eventHandler attached.
  }
  // true // NAV 가 제일 첫번째로 찍힘. (default == false. true시 capturing phase.)
);

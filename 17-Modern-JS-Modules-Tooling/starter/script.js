/////////////////////////////////////////////

// Modern Javascript coding 꿀팁.
// Script 어떻게 분할하고 module을 어떻게 import 하는지,
// Design pattern 에 대해서 학습.

// 3-rd party module이 굉장히 많음. (packages. npm repository, jquery, leaflet library,...)
// coding 만 다 했따고 끝나는 게 아님.

// Importing module
// 'use strict' (all modules are executed in strict mode by default)
// console.log('Top of script.js');
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// addToCart('bread', 5);
// console.log(price, tq);

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('pizza', 7);
// console.log(ShoppingCart.totalPrice, ShoppingCart.tq);

// import add, { cart } from './shoppingCart.js';
// // 하나의 모듈을 두번 import하는것은 절대 권장x
// // named export 와 default export를 섞어 쓰는 것도 절대 권장 x
// // import는 export하는 파일과의 live connection 이라는 것을 보여줌.
// // not just copied
// add('hamburger', 9);
// add('bread', 5);
// add('apples', 3);

// console.log(cart);

////////////////////////////////////////////////
// TOP - level await (ES2022)
// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// // async function 밖에서의 await 키워드는 모듈의 전체 진행을 막는다.

// console.log('Something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

// NOt very clean
// lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log();

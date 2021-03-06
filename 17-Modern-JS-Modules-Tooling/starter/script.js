// /////////////////////////////////////////////

// // Modern Javascript coding 꿀팁.
// // Script 어떻게 분할하고 module을 어떻게 import 하는지,
// // Design pattern 에 대해서 학습.

// // 3-rd party module이 굉장히 많음. (packages. npm repository, jquery, leaflet library,...)
// // coding 만 다 했따고 끝나는 게 아님.

// // Importing module
// // 'use strict' (all modules are executed in strict mode by default)
// // console.log('Top of script.js');
// // import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// // addToCart('bread', 5);
// // console.log(price, tq);

// // import * as ShoppingCart from './shoppingCart.js';
// // ShoppingCart.addToCart('pizza', 7);
// // console.log(ShoppingCart.totalPrice, ShoppingCart.tq);

// // import add, { cart } from './shoppingCart.js';
// // // 하나의 모듈을 두번 import하는것은 절대 권장x
// // // named export 와 default export를 섞어 쓰는 것도 절대 권장 x
// // // import는 export하는 파일과의 live connection 이라는 것을 보여줌.
// // // not just copied
// // add('hamburger', 9);
// // add('bread', 5);
// // add('apples', 3);

// // console.log(cart);

// ////////////////////////////////////////////////
// // TOP - level await (ES2022)
// // console.log('Start fetching');
// // const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// // const data = await res.json();
// // console.log(data);
// // // async function 밖에서의 await 키워드는 모듈의 전체 진행을 막는다.

// // console.log('Something');

// // const getLastPost = async function () {
// //   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// //   const data = await res.json();
// //   console.log(data);

// //   return { title: data.at(-1).title, text: data.at(-1).body };
// // };

// // const lastPost = getLastPost();
// // console.log(lastPost);

// // // NOt very clean
// // // lastPost.then(last => console.log(last));

// // const lastPost2 = await getLastPost();
// // console.log();

// ////////////////////////////////////////////////////////
// // // Module pattern
// // const ShoppingCart2 = (function () {
// //   const cart = [];
// //   const shippingCost = 10;
// //   const totalPrice = 237;
// //   const totalQuantity = 23;

// //   const addToCart = function (product, quantity) {
// //     cart.push({ product, quantity });
// //     console.log(
// //       `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
// //     );
// //   };

// //   const orderStock = function (product, quantity) {
// //     cart.push({ product, quantity });
// //     console.log(`${quantity} ${product} ordered from supplier`);
// //   };

// //   return {
// //     addToCart,
// //     cart,
// //     totalPrice,
// //     totalQuantity,
// //   };
// // })();
// // // IIFE(Immediately Invoked Function Expression) 을 통해 최초 1회 실행시키고,
// // // module의 export 를 return으로 대신함.
// // // import 하여 사용할 변수, 함수들을 return시키고 ShoppingCart2라는 변수에 할당시킴.
// // // 이 모든것이 closure(클로저)를 통해 가능하게 됨.

// // ShoppingCart2.addToCart('apple', 4);
// // ShoppingCart2.addToCart('pizza', 2);

// // console.log(ShoppingCart2);
// // console.log(ShoppingCart2.shippingCost);

// ////////////////////////////////////////////////////////
// // // CommonJS Modules ( Browser에서 동작 안하더라도 Node js 에서 동작함.)
// // Export
// // export.addToCart = function (product, quantity) {
// //   cart.push({ product, quantity });
// //   console.log(
// //     `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
// //   );
// // };

// // // Import
// // const {addToCart} = require('./shoppingCart.js')

// // import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash-es';
// // import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

// const stateClone = Object.assign({}, state);
// // state.user.loggedIn = false;
// console.log(stateClone);

// const stateDeepClone = cloneDeep(state); // Good solution to Deep Clone
// state.user.loggedIn = false;
// console.log(stateDeepClone);

// if (module.hot) {
//   // module.hot은 parcel에서만 사용.
//   // hot module reloading이 뜻하는 것은, 우리가 모듈 중 하나를 변경했을 때, rebuild를 trigger 함.
//   // 그리고 페이지를 새로고침하지 않고 바로 페이지에 반영됨.
//   module.hot.accept();
// }

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}
const dohyun = new Person('Dohyun');

console.log(dohyun ?? null);

console.log(state.cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/array/promise';

// Polifilling async function
import 'regenerator-runtime/runtime';

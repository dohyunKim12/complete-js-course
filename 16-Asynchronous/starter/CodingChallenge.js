'use strict';

// CC 1
// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// btn.addEventListener('click', function () {
//   console.log('fuck');
// });

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data.country);
//     })
//     .catch(err => console.error(`${err.message}`));
// };

// whereAmI('37.4994', '127.0334');

///////////////////////////////////////////
// CC 2
// Part 1
const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// when image is done loading, append it to DOM EL with the 'images' class, and resolve the promise.
// fullfilled value should be the image element itself.

///////////////////////////////////////////
// Part 2
// Consume the promise using .then and also add an error handler.
//  ...
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

let currentImage;

// createImage('./img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// console.log(createImage());

////////////////////////////////////////////
// CC 3
// Part 1
const loadNPause = async function () {
  try {
    let img = await createImage('./img/img-1.jpg');
    currentImage = img;
    await wait(2);
    currentImage.style.display = 'none';
    img = await createImage('./img/img-2.jpg');
    currentImage = img;
    await wait(2);
    currentImage.style.display = 'none';
  } catch (err) {
    console.error(err);
    throw err;
  }
};
// Compare with version above, I prefer async & await version. (More simple and Looks good, Intuitive)

const loadAll = async function (imgArr) {
  // const imgs = await Promise.all(imgArr.map(img => createImage(img)));
  const imgs = await Promise.race(imgArr.map(img => createImage(img)));
  console.log(imgs);
};

loadAll(['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg']);

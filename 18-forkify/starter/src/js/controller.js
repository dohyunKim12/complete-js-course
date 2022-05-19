import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const goNextPg = function () {
  changePg(true);
};
const goPrevPg = function () {
  changePg(false);
};
const changePg = function (isNext = false) {
  isNext ? model.state.search.page++ : model.state.search.page--;
  resultsView.render(model.getSearchResultsPage(model.state.search.page));
  paginationView.render(model.state.search);
  paginationView._btnNext = document.querySelector('.pagination__btn--next');
  paginationView._btnPrev = document.querySelector('.pagination__btn--prev');
  paginationView.addHandlerPagination(goNextPg, goPrevPg);
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. render results
    resultsView.render(model.getSearchResultsPage());

    // 4. Render initial pagination buttons
    paginationView.render(model.state.search);
    paginationView._btnNext = document.querySelector('.pagination__btn--next');
    paginationView._btnPrev = document.querySelector('.pagination__btn--prev');

    // 5. Add handler pagination
    paginationView.addHandlerPagination(goNextPg, goPrevPg);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

import * as model from './model.js';
import recipeView from './views/recipeView.js';
// import RecipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// depencies
import 'core-js/actual';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

if (module.hot) {
  module.hot.accept();
}

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
console.log('Hello from controller.js');

const controlRecipes = async function () {
  try {
    const id = window.location.href.split('/').pop();
    console.log(`href = ${window.location.href.split('/').pop()}`);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    const { recipe } = model.state;
    // reder recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError(`⛔⛔⛔⛔  ${err}  ⛔⛔⛔⛔`);
  }
};
// window.addEventListener('hashchange', controlRecipes());
// window.addEventListener('load', controlRecipes());
//['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipes));

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) {
      console.log('<<<< No query submitted >>>>');
      searchView.clearInput();
      return;
    }

    await model.loadSearchResults(query);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

init();

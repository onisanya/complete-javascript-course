import { async } from 'regenerator-runtime';
import { getJSON } from './helpers.js';
import {
  FORKIFY_API_URL,
  FORKIFY_GET_QUERY,
  FORKIFY_SEARCH_QUERY,
  RES_PER_PAGE,
} from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: 10,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(
      `${FORKIFY_API_URL}${FORKIFY_GET_QUERY}${id}`
      //'https://forkify-api.herokuapp.com/api/get?rId=47746'
    );

    // if (!data.ok) throw new Error(`${data.message} (${data.status})`);

    console.log('logging data: ', data);

    const { recipe } = data;
    state.recipe = {
      id: recipe.recipe_id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log('logging state.recipe: ', state.recipe);
  } catch (err) {
    console.error(`⛔⛔⛔⛔  ${err}  ⛔⛔⛔⛔`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    console.log(`Query: ${FORKIFY_API_URL}${FORKIFY_SEARCH_QUERY}${query}`);
    const data = await getJSON(
      `${FORKIFY_API_URL}${FORKIFY_SEARCH_QUERY}${query}`
    );
    console.log('logging search data: ', data);

    state.search.results = data.recipes.map(rcp => {
      return {
        id: rcp.recipe_id,
        title: rcp.title,
        publisher: rcp.publisher,
        sourceURL: rcp.source_url,
        image: rcp.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`⛔⛔⛔⛔  ${err}  ⛔⛔⛔⛔`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  const start = (page - 1) * RES_PER_PAGE; //0
  const end = page * RES_PER_PAGE;
  if (page >= 0 && page <= end) {
    state.search.page = page;
  }
  // const start = state.search.results.slice
  // return state.search.results.slice(start, end);
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  // Update the servings value
  state.recipe.ingredients.foreach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
  });
  state.recipe.servings = newServings;
  // Update recipe view
};

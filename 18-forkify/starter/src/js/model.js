import { async } from 'regenerator-runtime';
import { getJSON } from './helpers.js';
import { FORKIFY_API_URL } from './config.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(
      `${FORKIFY_API_URL}${id}`
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
  }
};

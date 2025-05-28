const { getAllRecipes, getRecipeById } = require('../handlers/recipeHandler');

const routes = [
  {
    method: 'GET',
    path: '/recipes',
    handler: getAllRecipes,
  },
  {
    method: 'GET',
    path: '/recipes/{id}',
    handler: getRecipeById,
  }
];

module.exports = routes;

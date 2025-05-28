const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, '../data/recipes.json');

const getAllRecipes = async (request, h) => {
  const { search } = request.query;

  const raw = fs.readFileSync(recipesPath);
  const recipes = JSON.parse(raw);

  if (search) {
    const input = search.toLowerCase().split(',').map(i => i.trim());
    const filtered = recipes.filter(recipe =>
      input.every(bahan =>
        recipe['Ingredients Cleaned']?.toLowerCase().includes(bahan) ||
        recipe.Title?.toLowerCase().includes(bahan)
      )
    );
    return h.response({ error: false, data: filtered }).code(200);
  }

  return h.response({ error: false, data: recipes }).code(200);
};

const getRecipeById = async (request, h) => {
  const { id } = request.params;

  const raw = fs.readFileSync(recipesPath);
  const recipes = JSON.parse(raw);
  const found = recipes.find(r => String(r.id) === id);

  if (!found) {
    return h.response({ error: true, message: 'Resep tidak ditemukan' }).code(404);
  }

  return h.response({ error: false, data: found }).code(200);
};

module.exports = { getAllRecipes, getRecipeById };

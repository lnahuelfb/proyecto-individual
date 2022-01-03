/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
require('dotenv').config();
const { axios } = require('axios');

const { API_KEY } = process.env;
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const { Recipe, Diet } = require('../db');

// const APIcall = async function () {
//   const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=60&addRecipeInformation=true`);
//   const apiInfo = await apiUrl.data.results.map(el => {
//     return {
//       id: el.id,
//       name: el.title,
//       summary: el.summary,
//       diets: el.diets.map(d => { return { name: d } }),
//       score: el.spoonacularScore,
//       healthiness: el.healthScore,
//       image: el.image,
//       createdInDb: false,
//       instructions: el.analyzedInstructions[0]?.steps.map(paso => {
//         return `<b>${paso.number}</b> ${paso.step}<br>`
//       })
//     }
//   })
//   return apiInfo
// };

const APIcall = async () => {
  try {
    const recipeApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`,
    );
    const requiredInfo = recipeApi.data.results.map((recipe) => ({
      title: recipe.title,
      created: false,
      Diets: recipe.diets.map((diet) => ({ name: diet })),
      healthiness: recipe.healthScore,
      summary: recipe.summary.replace(/<[^>]*>?/g, ''),
      image: recipe.image,
      id: uuidv4(),
      score: parseInt(recipe.spoonacularScore),
      steps: recipe.analyzedInstructions
        .map((r) => r.steps.map((s) => s.step))
        .flat(2)
        .join(''),
    }));
    return requiredInfo;
  } catch {
    console.log('HAY ERROR EN APICALL');

    (e) => console.log(e);
  }
};

const getRecipes = async (req, res, next) => { };

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByPK(id, {
      include: {
        model: Diet,
        through: {
          attributes: [],
        },
      },
    });

    if (recipe) {
      return res.status(200).json(recipe);
    }

    return res.status(404).json({
      error: 'No se ha encontrado la receta',
    });
  } catch {
    (err) => next(err);
  }
};

const deleteRecipe = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Recipe.destroy({
      where: {
        id,
      },
    });

    return res.send('Receta borrada con exito!');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  deleteRecipe,
};

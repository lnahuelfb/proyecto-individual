/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

const { v4: uuidv4 } = require('uuid');
const express = require('express');

const { axios } = require('axios');

const { API_KEY } = process.env;
const { Op } = require('sequelize');

const { Recipe, Diet } = require('../db');

const router = express.Router();

const API = async () => {
  try {
    const APICall = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    const data = APICall.data.results.map((recipe) => ({
      title: recipe.title,
      created: false,
      Diets: recipe.diets.map((diet) => ({
        name: diet,
      })),
      healthy: recipe.healthScore,
      summary: recipe.summary,
      image: recipe.image,
      id: uuidv4(),
      score: parseInt(recipe.spoonacularScore),
      steps: recipe.analyzedInstructions.map((rec) => {
        rec.steps.map((s) => {
          s.step;
        });
      }).flat(2).join(''),
    }));

    return data;
  } catch {
    console.log('Error en el llamado a la API');
    (err) => console.error(err);
  }
};

router.get('/', async (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    const allRecipesOnDB = await Recipe.findAll({
      include: {
        model: Diet,
        through: {
          attributes: [],
        },
      },
    });

    if (allRecipesOnDB.length > 0) {
      return res
        .status(200)
        .send(allRecipesOnDB);
    }

    try {
      const data = await API();
      const recipesBulk = await Recipe.bulkCreate(data);

      recipesBulk.map((recipe) => {
        data.map((r) => {
          if (r.id === recipe.id && r.Diets.length) {
            r.Diets.map(async (diet) => {
              try {
                diet.name = `${diet.name.charAt(0).toUpperCase()} ${diet.name.slice(1)}`;

                const dietOnDB = await Diet.findOne({
                  where: {
                    name: diet.name,
                  },
                });

                await recipe.addDiet(dietOnDB);
              } catch {
                console.log('La dieta no se ha asociado');
                (err) => next(err);
              }
            });
          }
        });
      });
      const AllrecipesOnBD = await Recipe.findAll({
        include: {
          model: Diet,
          through: {
            attributes: [],
          },
        },
      });

      return res
        .status(200)
        .send(AllrecipesOnBD);
    } catch (err) {
      console.log('No se ha podido crear y obtener las recetas');

      next(err);
    }
  } else {
    const query = name.toLowerCase();

    try {
      const FilterRecipes = await Recipe.findAll({
        where: {
          title: {
            [Op.like]: `%${query}%`,
          },
        },
        include: {
          model: Diet,
          through: {
            attributes: [],
          },
        },
      });

      return res
        .status(200)
        .send(FilterRecipes);
    } catch {
      console.log('Error al filtrar');
      (err) => next(err);
    }
  }
});

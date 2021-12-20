/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

const express = require('express');
const { getRecipes, getRecipeById, deleteRecipe } = require('../controller/Recipe');

const router = express.Router();

router.get('/', getRecipes);

router.get('/:id', getRecipeById);

router.delete('/:id', deleteRecipe);

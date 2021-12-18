const { DataTypes, Model } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  class Recipe extends Model { }

  Recipe.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    score: {
      type: DataTypes.FLOAT,
    },

    healthy: {
      type: DataTypes.FLOAT,
    },

    steps: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'recipe',
  });

  // sequelize.define('recipe', {
  //   name: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  // });
};

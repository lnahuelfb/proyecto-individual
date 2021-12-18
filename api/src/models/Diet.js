/* eslint-disable linebreak-style */
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Diet extends Model { }

  Diet.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'diet',
  });
};

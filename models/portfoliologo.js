'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PortfolioLogo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PortfolioLogo.init({
    text: DataTypes.STRING,
    title: DataTypes.STRING,
    cover_img: DataTypes.STRING,
    silka: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PortfolioLogo',
  });
  return PortfolioLogo;
};
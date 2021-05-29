'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SMM extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SMM.init({
    name: DataTypes.STRING,
    text: DataTypes.STRING,
    silka: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SMM',
  });
  return SMM;
};
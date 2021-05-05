'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Car.hasMany(models.Photo, {as: 'photos', foreignKey: 'carId'})
    }
  };
  Car.init({
    year: DataTypes.INTEGER,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};
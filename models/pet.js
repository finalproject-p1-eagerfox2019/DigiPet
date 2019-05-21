'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    userID: DataTypes.INTEGER,
    AnimalID: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    happiness: DataTypes.INTEGER,
    priceValue: DataTypes.INTEGER,
    experience: DataTypes.INTEGER,
    togetherness: DataTypes.INTEGER
  }, {});
  Pet.associate = function(models) {
    // associations can be defined here
    // Pet.belongsToMany(models.User, {foreignKey: 'UserID'})
    // Pet.belongsToMany(models.Animal, {foreignKey : 'AnimalID'})
    //alternate ways ny pakai throught di kedua table (User and Animal , through Pet tapi ada weakness nya)
  };
  return Pet;
};
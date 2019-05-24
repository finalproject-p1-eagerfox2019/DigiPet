'use strict';
module.exports = (sequelize, DataTypes) => {
  const Animal = sequelize.define('Animal', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image : DataTypes.STRING
  }, {});
  Animal.associate = function(models) {
    // associations can be defined here
    Animal.hasMany(models.Pet, {foreignKey: 'AnimalID'})
  };
  return Animal;
};
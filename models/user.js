'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    petQuantity: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Pet, {foreignKey: 'UserID'})
  };
  return User;
};
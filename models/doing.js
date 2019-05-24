'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doing = sequelize.define('Doing', {
    todo: DataTypes.STRING,
    point: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {});
  Doing.associate = function(models) {
    // associations can be defined here
  };
  return Doing;
};
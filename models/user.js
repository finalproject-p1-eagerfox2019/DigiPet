'use strict';
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        is : {
          args : /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
          msg : "input email containing wrong symbol"
        },
        uniqueEmail : function(value, next){
          User.findOne({
            where : {
              email : value
            }
          })
          .then(sameEmail => {
            if(sameEmail){
              throw 'emial has been taken'
            }else{
              return next()
            }
          })
          .catch(err => {
            return err
          })
        }
      }
    },
    password : {
      type : DataTypes.STRING,
    validate : {
      len : {
        args : [6, 12],
        msg : 'password must be more than 6 or less than 12 words'
      }
    }
  },
    petQuantity: DataTypes.INTEGER
  }, {
    hooks : {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, salt)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Pet, {foreignKey: 'userID'})
  };
  return User;
};
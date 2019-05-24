'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Doings', [{
    todo : 'pinap berry',
    point : 2,
    img : "/img/Pinap_Berry.png",
    createdAt : new Date(),
    updatedAt : new Date()
  },{
    todo : 'nanab berry',
    point : 3,
    img : "/img/Nanab_Berry.png",
    createdAt : new Date(),
    updatedAt : new Date()
  },{
    todo : 'goRazz berry',
    point : 1,
    img : "/img/GO_Razz_Berry.png",
    createdAt : new Date(),
    updatedAt : new Date()
  },{
    todo : 'go to walk',
    point : 5,
    img : "/img/walk.png",
    createdAt : new Date(),
    updatedAt : new Date()
  },{
    todo : 'joining contest',
    point : 10,
    img : "/img/trophy.png",
    createdAt : new Date(),
    updatedAt : new Date()
  }
], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Doings', null, {})
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Animals',[{
        name: "Aero",
        price: "10",
        description : "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        name: "Blitz",
        price: "15",
        description : "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        name: "Leafy",
        price: "20",
        description : "Living in the deep rain forest, ....",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        name: "Snowy",
        price: "25",
        description : "Tend to live in ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Animals', null, {})
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Animals',[{
        name: "Flareon",
        price: "10",
        image: "/flareon.gif",
        description : "High Affinity with Fire Elements, tend to live in high temperature Area",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        name: "Blitz",
        price: "15",
        image: "/jolteon.gif",
        description : "High Affinity with Thunder Elements, rarely sighted",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        name: "Leafy",
        price: "20",
        image: "/leafeon.gif",
        description : "High affinity with Nature Elements, usually found in the deep rain forest",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        name: "Snowy",
        price: "25",
        image: "/aqua.gif",
        description : "High Affinity with Water Elements, tend to live in deep water ",
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

'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert("Users",[
      {
        firstName:"Jhon",
        lastName:"Doe",
        email:"jhon.doe@gmail.com",
        password:bcrypt.hashSync('secret',10),
        gender:"male"
      },
      {
        firstName:"Sam",
        lastName:"Smith",
        email:"sam.smith@gmail.com",
        password:"secret",
        gender:"male"
      },
      {
        firstName:"Jaen",
        lastName:"Doe",
        email:"jaen.doe@gmail.com",
        password:"secret",
        gender:"female"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};

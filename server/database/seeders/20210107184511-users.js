"use strict";

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
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John",
          email: "John@gmail.com",
          password: "John123456",
          is_admin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Amani",
          email: "Amani@gmail.com",
          password: "Amani123456",
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "David",
          email: "David@gmail.com",
          password: "David123456",
          is_admin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Israel",
          email: "Israel@gmail.com",
          password: "Israel123456",
          is_admin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rubeni",
          email: "Rubeni@gmail.com",
          password: "Rubeni123456",
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mpano",
          email: "Mpano@gmail.com",
          password: "Mpano123456",
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ishamael",
          email: "ishamael@gmail.com",
          password: "Mpano123456",
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "sept",
          email: "sept@gmail.com",
          password: "Mpano123456",
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "inka",
          email: "inka@gmail.com",
          password: "Mpano123456",
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

'use strict';
const modules = require('../../models');
const User = modules.User
const Chat = modules.Chat
const ChatUser = modules.ChatUser
const Message = modules.Message

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

    const users = await User.findAll({limit:2})
    const chat = await Chat.create();

    await ChatUser.bulkCreate([
      {
        chatId:chat.id,
        userId:users[0].id
      },
      {
        chatId:chat.id,
        userId:users[1].id
      }
    ])

    await Message.bulkCreate([
      {
        message:'Hello friends',
        chatId:chat.id,
        fromUserId:users[0].id
      },
      {
        message:'Hi buddy',
        chatId:chat.id,
        fromUserId:users[1].id
      },
      {
        message:'Long time no speack',
        chatId:chat.id,
        fromUserId:users[1].id
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
  }
};

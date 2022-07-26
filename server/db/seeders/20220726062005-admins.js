module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Admins',
      [
        {
          login: 'admin',
          password: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Admins', null, {});
  },
};

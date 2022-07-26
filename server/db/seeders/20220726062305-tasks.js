module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          description: 'Сделать список',
          user_name: 'Danil',
          user_email: 'danil@danil.com',
          done: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'Переделать список',
          user_name: 'Petr',
          user_email: 'petr@petr.com',
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'Доделать список',
          user_name: 'Danil2',
          user_email: 'danil234@danil.com',
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'Выполнить список',
          user_name: 'Petr',
          user_email: 'petr@petr.com',
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};

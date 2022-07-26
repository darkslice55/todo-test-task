const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {}
  Task.init(
    {
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      user_name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      user_email: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      done: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'Task',
    },
  );
  return Task;
};

const { Task } = require('../db/models');

class TaskService {
  getAllTasks() {
    return Task.findAll();
  }

  getFiltredTasks(props) {
    const { offset, order, direction, limit } = props;
    return Task.findAll({
      order: [[order, direction]],
      offset,
      limit,
    });
  }

  createTask(newTask) {
    return Task.create({
      ...newTask,
      done: false,
      edited: false,
    });
  }

  updateTask(newData) {
    return Task.update(newData, {
      where: {
        id: newData.id,
      },
    });
  }
}

module.exports = new TaskService();

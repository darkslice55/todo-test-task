const router = require('express').Router();
const taskRouter = require('./tasks.routes');
const authRouter = require('./auth.routes');

router.use('/api/tasks', taskRouter);
router.use('/api/auth', authRouter);

module.exports = router;

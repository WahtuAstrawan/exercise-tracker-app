const router = require('express').Router();
const { addUsers, getUsers, addExercises, getLogs } = require('../controllers/usersController');

router.post("/", addUsers);
router.get("/", getUsers);
router.post("/:_id/exercises", addExercises);
router.get("/:_id/logs", getLogs);

module.exports = router;
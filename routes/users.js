const router = require('express').Router();
const { addUsers, getUsers, addExercises } = require('../controllers/usersController');

router.post("/", addUsers);
router.get("/", getUsers);
router.post("/:_id/exercises", addExercises);

module.exports = router;
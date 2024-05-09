const { Router } = require('express');
const { createUser, getUser } = require('../controllers/user.controllers');

const router = Router();

router.get('/', getUser);
router.post('/', createUser);


module.exports = router;
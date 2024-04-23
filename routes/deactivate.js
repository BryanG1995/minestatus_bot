const { Router } = require('express');
const { deactivate } = require('../controllers/activate');

const router = Router();

router.get('/', deactivate);


module.exports = router;
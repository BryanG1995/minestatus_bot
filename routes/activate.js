const { Router } = require('express');
const { activate } = require('../controllers/activate');

const router = Router();

router.get('/', activate);


module.exports = router;
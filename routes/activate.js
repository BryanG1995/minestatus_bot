const { Router } = require('express');
const { activate,status } = require('../controllers/activate');

const router = Router();

router.get('/', activate);
router.get('/status', status);



module.exports = router;
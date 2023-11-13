const { Router } = require('express');
const router = Router();

const { createFaker } = require('../controllers/fakers');

router.post('/', createFaker)

module.exports = router;
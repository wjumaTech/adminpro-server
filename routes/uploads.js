const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const router = Router();

const { fileUpload } = require('../controllers/uploads');

router.use(expressFileUpload())

router.put('/:tipo/:id', fileUpload);

module.exports = router;
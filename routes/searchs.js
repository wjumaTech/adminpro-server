const { Router } = require('express');
const router = Router();

const { getBuscar, getDocumentosColeccion } = require('../controllers/searchs');

router.get('/', getBuscar);

router.get('/:tabla', getDocumentosColeccion);

module.exports = router;
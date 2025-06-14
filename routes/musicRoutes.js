const express = require('express');
const router = express.Router();
const controller = require('../controllers/musicController');

router.get('/', controller.getAll);
router.get('/search', controller.searchByTitle);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
module.exports = router;

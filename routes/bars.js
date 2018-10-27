var express = require('express');
var router = express.Router();
var bars =  require('../controllers/barsController')

router.get('/', bars.index);

router.get('/new', bars.new);

router.get('/:id', bars.show);

router.post('/', bars.create);

router.post('/:id/beers', bars.addBeer);

router.get('/:id/beers/:beerid/remove', bars.removeBeer);

router.delete('/:id', bars.destroy)


module.exports = router;
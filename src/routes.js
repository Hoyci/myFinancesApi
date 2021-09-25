const { Router } = require('express');
const UserController = require('./app/controller/UserController')

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:username', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);


module.exports = router
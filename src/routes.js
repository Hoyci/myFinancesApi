const { Router, request } = require('express');
const UserController = require('./app/controller/UserController')
const { userValidation, userVerification } = require('./app/middlewares/userValidation')
const router = Router();


router.get('/login', (request, response) => {
    response.sendFile('/home/ruan/projetos/myfinance/src/public/login.html')
})
router.get('/register', (request, response) => {
    response.sendFile('/home/ruan/projetos/myfinance/src/public/register.html')
})
router.post('/login', (request, response) => {
    const { email, password } = request.body
    console.log(email, password)
    response.status(200)
})
router.get('/users', UserController.index);
router.get('/users/:nome', userValidation, UserController.show);
router.post('/users', userVerification, userValidation, UserController.store);
router.patch('/users/:id', userValidation, UserController.update);
router.delete('/users/:id', userValidation, UserController.delete);


module.exports = router
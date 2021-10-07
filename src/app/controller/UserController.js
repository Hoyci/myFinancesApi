const UserRepository = require('../repositories/UserRepository')
const bcrypt = require('bcryptjs')

function getDate() {
    const date = new Date()
    return date
}

class UserController {

    async index(request, response) {
        const users = await UserRepository.findAll();
        response.json(users)
    }

    async show(request, response) {
        const { nome } = request.params;
        const user = await UserRepository.findByUsername(nome)
        response.json(user)
    }

    async store(request, response) {
        const { username, password, email } = request.body
        const passwordCryp = bcrypt.hashSync(password, 10)
        const newUser = await UserRepository.create(username, passwordCryp, email, getDate());
        response.json(newUser)
    }

    /* Como posso usar essa função para atualizar somente um campo de um usuário e manter os outros? */
    /* É viável criar outras funções no UserRepository de update para campos especificos? */
    /* Ou é viável criar uma rota para atualizar senha, outra para atualizar usuário e outra para atualizar email? */
    async update(request, response) {
        const { id } = request.params;
        let body = request.body;
/*         const { username, password, email } = request.body; */
        for (let info in body){
            console.log(info)
            console.log(typeof(request.body[info]))
            if (info == 'password'){
                const passwordCryp = bcrypt.hashSync(body[info], 10)
                const updateUser = await UserRepository.update(id, info, passwordCryp)
                response.json(updateUser)
            }
            const updateUser = await UserRepository.update(id, info, request.body[info])
            response.json(updateUser)
        }
        /* const passwordCryp = bcrypt.hashSync(password, 10)
        const updateUser = await UserRepository.update(id, username, passwordCryp, email, getDate());
        response.json(updateUser) */
    }

    async delete(request, response) {
        const { id } = request.params;
        UserRepository.deleteUser(id)
        response.sendStatus(204)
    }
};


module.exports = new UserController();
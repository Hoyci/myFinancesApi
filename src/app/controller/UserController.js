const UserRepository = require('../repositories/UserRepository')

class UserController {

    index(request, response) {
        const users = UserRepository.findAll();
        response.json(users)
    }

    show(request, response){
        const { username } = request.params;
        const user = UserRepository.findByUsername(username)
        if (!user) {
            return response.status(404).json({ error : "User not found"})
        }
        response.json(user)
    }

    store(request, response){
        const { name, username, phoneNumber } = request.body
        const verify = UserRepository.findByUsername(username)
        if (verify){
            return response.status(404).json({ error : "Username is already in use"})
        }
        const newUser = UserRepository.create(name, username, phoneNumber)
        response.json(newUser)
    }

    update(request, response){
        const { id } = request.params;
        const { name, username, phoneNumber } = request.body;
        const verify = UserRepository.findById(id);
        if (!verify){
            return response.status(404).json({ error : "User not found"})
        };
        if (name == '' || name == undefined){
            return response.status(404).json({ error : "Name cannot be empty"})
        };
        if (username == '' || username == undefined){
            return response.status(404).json({ error : "Username cannot be empty"})
        };
        if (phoneNumber == '' || phoneNumber == undefined){
            const updateUser = UserRepository.updateNoPhoneNumber(id, name, username)
            return response.json(updateUser)
        };
        const updateUser = UserRepository.update(id, name, username, phoneNumber);
        response.json(updateUser);
    }

    delete(request, response){
        const { id } = request.params;
        const user = UserRepository.findById(id)
        if (!user){
            return response.status(404).json({error : "User not found"})
        }

        UserRepository.deleteUser(id)
        response.sendStatus(204)
    }
};


module.exports = new UserController();
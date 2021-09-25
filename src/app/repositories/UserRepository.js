const { v4 : uuid } = require('uuid');


let users = [
    {
        "id": uuid(),
        "name": "Ruan Pablo",
        "username": "hoyci",
        "phoneNumber" : "5521996278972"
    },
    {
        "id": uuid(),
        "name": "Marcelo Figueiredo",
        "username": "hydenz",
        "phoneNumber" : "5521999669966"
    },
];

class UserRepository {

    findAll(){
        return users
    }


    findById(id){
        const user = users.find(el => el.id == id)
        return user
    }

    findByUsername(username){
        const user = users.find(el => el.username == username)
        return user
    }

    create(name, username, phoneNumber){
        const newUser = {"id": uuid(), name, username, phoneNumber}
        users.push(newUser)
        return newUser
    }

    update(id, name, username, phoneNumber){
        const updateUser = users.find(el => el.id == id)
        Object.assign(updateUser, {name, username, phoneNumber})
        return updateUser
    }

    updateNoPhoneNumber(id, name, username){
        const updateUser = users.find(el => el.id == id)
        Object.assign(updateUser, {name, username})
        return updateUser
    }

    deleteUser(id){
        users = users.filter(el => el.id !== id);
    }
};


module.exports = new UserRepository();
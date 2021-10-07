const UserRepository = require('../repositories/UserRepository')

async function userValidation(request, response, next) {
    const { id, nome } = request.params;
    const { username, email } = request.body;
    if (id){
        const verifyId = await UserRepository.findById(id);
        if (!verifyId){
            return response.status(404).json({ error : "User not found"});
        };
    };
    if (nome){
        const verifyNome = await UserRepository.findByUsername(nome);
        if (!verifyNome) {
            return response.status(404).json({ error : "Username not found"});
        }
    }
    if (username) {
        const verifyUsername = await UserRepository.findByUsername(username);
        if (verifyUsername){
            return response.status(404).json({ error : "Username is already in use"});
        };
    };
    if (email){
        const verifyEmail = await UserRepository.findByEmail(email);
        if (verifyEmail){
            return response.status(404).json({error : "Email is already in use"});
        };
    };

    next();
}

function userVerification(request, response, next){
    const { username, password, email } = request.body
    if (username == '' || username == null){
        return response.status(404).json({ error : "Username cannot be empty"})
    };
    if (password == '' || password == null){
        return response.status(404).json({ error : "Password cannot be empty"})
    };
    if (email == '' || email == null){
        return response.status(404).json({ error : "Email cannot be empty"})
    };

    next();
}

module.exports = {userValidation, userVerification}
const db = require('../../database/index')

class UserRepository {

    async findAll(){
        const rows = await db.query('SELECT id, username, email FROM users');
        return rows
    }

    async findById(id){
        const [row] = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return row
    }

    async findByUsername(username){
        const [row] = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return row
    }

    async findByEmail(email){
        const [row] = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return row
    }

    async create(username, password, email, created){
        const [row] = await db.query(`
        INSERT INTO users (username, password, email, created_on)
        VALUES ($1, $2, $3, $4)
        RETURNING id, username, email
        `, [username, password, email, created]);
        return row
    }

    async update(id, place, info){
        const [row] = await db.query(`
        UPDATE users
        SET ${place} = $3
        WHERE ID = $1
        RETURNING id, username, email
        `, [id, info])
        return row
    }

    async deleteUser(id){
        const deleteOp = await db.query(`DELETE FROM users WHERE id = $1`, [id])
        return deleteOp
    }
};


module.exports = new UserRepository();
import express from 'express';
import createToken from '../services/login/createToken';
import initDB from '../services/login/initDB';
import getUser from '../repository/getUser';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const {userId} = req.body;
        console.log(userId);
        const user = await getUser(userId);
        if (!user) {
            throw {status: 401, message: "user unauthorized to login!"};
        }
        const token = createToken(userId);
        await initDB(userId);
        res.send({
            token,
            username: user.name
        }).status(200);
    } catch (err) {
        next(err);
    }
});

export default router;

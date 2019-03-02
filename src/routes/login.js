import express from 'express';
import createToken from '../services/login/createToken';
import initDB from '../services/login/initDB';

const router = express.Router();

router.post('/', (req, res) => {
    const token = createToken(req.userId);
    initDB(req.userId);
    res.send(token).status(200);
});

export default router;

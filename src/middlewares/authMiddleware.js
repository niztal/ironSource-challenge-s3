import jwt_decode from 'jwt-decode';

export default (req, res, next) => {
    const authorizationHeader = req.headers.authorization && req.headers.authorization.startsWith('Bearer ');
    if (!authorizationHeader) {
            console.error('no authorization found...', req.method);
            res.status(401).send();
    } else {
        const jwtToken = req.headers.authorization.split('Bearer ')[1];
        const decodedJwt = jwt_decode(jwtToken);
        if (decodedJwt && decodedJwt.userId) {
            req.userId = decodedJwt.userId;
            next();
        } else {
            res.status(401).send();
        }
    }
}
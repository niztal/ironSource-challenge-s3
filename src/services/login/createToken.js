import jwt from 'jwt-simple';

const createToken = (userId) => {
    const jwtPayload = {userId};
    var secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex');
    return jwt.encode(jwtPayload, secret);
}

export default createToken;
export default (err, req, res, next) => {
    if (err) {
        console.error(err);
        res.status(err.status ? err.status : 500).send(err.message);
    } else{
        next();
    }
}
const jwt = require('jsonwebtoken');



module.exports = (reg, res, next) => {
    try {
    const token = reg.haders.Authorization.split(' ')[1];
    jwt.verify(token, 'And_Even_When_I_Cant_Say_I_Love_You_I_Love_You');
    next();
    } catch (error) {
        res.status(401).json({ messageL: "Auth failed!"});
    }

};
//aqui vamos a verificar constantemente los usuarios en lugar de estar haciendolo constantemente

function authUser (req, res, next){
    if(!req.session || !req.session.usuario || !req.session.usuario.id){
        return res.redirect('/login');
    }
    next();
}

module.exports = {
    authUser
};
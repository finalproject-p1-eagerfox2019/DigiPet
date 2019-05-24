function thisSesion(req, res, next){
    if(req.session !== undefined){
        next()
    }else{
        res.redirect('/home')
    }
}

module.exports = thisSesion
function mustAuth(request, response, next){
    if (request.user === undefined){
        response.sendStatus(401)
    }
    else{
        return next()
    }
}
module.export = {
    mustAuth
}
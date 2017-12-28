exports.verifyToken =  function(req, res, next)
{
    console.log('in verify token');
    const bearerHeader = req.headers['authorization'];
    console.log('header is' + bearerHeader);
    console.log('type of bearerHeader is ' + typeof bearerHeader);
    if(typeof bearerHeader != undefined)
    {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        console.log('token extracted is ' + bearerToken);
        req.token = bearerToken;
        next();
    }else
    {
        res.sendStatus(403);
    }
};
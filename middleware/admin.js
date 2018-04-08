// To check if the user is admin

module.exports = function (req, res, next) {

    if(!req.user.isAdmin) return res.status(403).send('Forbidden, you dont have admin rights')
    next()
}
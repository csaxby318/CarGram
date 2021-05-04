
const jwt = require('jsonwebtoken');
const models = require('./models');

const authenticate = (req, res, next) => {

    let headers = req.headers['authorization']
    if(headers) {
        const token = headers.split(' ')[1]
        const decoded = jwt.verify(token, 'SOMETHINGSECRET')
        if(decoded) {
            const username = decoded.username
            const userId = decoded.userId
            const authUser = models.User.findOne({
                where: {
                    username: username,
                    id: userId
                }
            })
            if(authUser) {
                next() // perform the original request
            } else {
                res.json({error: 'Unable to authenticate'})
            }
        } else {
            res.json({error: 'Unable to authenticate'})
        }
    } else {
        res.json({error: 'Required headers are missing..'})
    }

}

module.exports = authenticate
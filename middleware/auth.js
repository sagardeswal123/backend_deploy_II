const jwt = require("jsonwebtoken");
require("dotenv").config()



const auth = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1]
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.key);
            if (decoded) {
                console.log(decoded)
                req.body.userId = decoded.userId
                req.body.user = decoded.user
                next()
            }
            else {
                res.json({ msg: "not authorised" })
            }

        }
        catch (error) {
            res.json({ error: "please login!!" })
        }
    }
    else {
        res.json({ msg: "please Login first" })
    }
}

module.exports = ({ auth })
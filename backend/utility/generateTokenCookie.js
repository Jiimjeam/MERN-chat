import jwt from 'jsonwebtoken'

const generateTokenCookie = (userId, res) => { 
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    //Security Measures 
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, //prevent JS access (cross-site scripting attacks)
        sameSite:"strict",  //prevent JS access (cross-site request forgery attacks)
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenCookie
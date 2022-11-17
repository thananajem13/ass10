import jwt from 'jsonwebtoken' 
import { userModel } from '../../DB/models/user.model.js'

export const roles = {
    Admin: "admin",
    User: "user",
    Hr: "hr"
}


export const auth = (accessRoles = []) => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers
            if (!authorization?.startsWith(process.env.BERERKEY)) {
                return res.status(400).json({ message: "in-valid bearer key" })
            } else {
                const token = authorization.split(process.env.BERERKEY)[1]
                const decoded = jwt.verify(token, process.env.EMAILTOKEN);
               
                if (!decoded?.id || !decoded?.isLoggedIn) {
                    return res.status(400).json({ message: "in-valid token payload" })
                } else {
                    const user = await userModel.findOne({_id:decoded?.id,isDeleted:false,isBlocked:false,confirmEmail:true})  
                    if (!user) {
                        return res.status(401).json({ message: "not register user" }) // not login user
                    } else {
                        console.log(accessRoles);
                        console.log(accessRoles.includes(user.role));
                        if (!accessRoles.includes(user.role)) {
                            return res.status(403).json({ message: "un-authorized user" })
                        } else {
                            req.user = user;
                            next()
                        }

                    }
                }
            }
        } catch (error) {
            return res.status(500).json({ message: "Catch error", error })
        }
    }
}
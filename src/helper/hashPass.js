import bcrypt from 'bcrypt'
export const hashPass = (pass, saltRound = parseInt(process.env.SALTROUND)) => {
    return bcrypt.hash(pass, saltRound)

}
import { userModel } from '../../DB/models/user.model.js'
import { hashPass } from './hashPass.js'

export const addFirstAdmin = async () => {
    try {
        const email = 'thana.najem13@gmail.com'
        const password = "123456qwert$EE"
        const role = "admin"
        const name = "thana najem" 
        const gender = 'female'
        const user = await userModel.findOne({ email }).select('email')
        if (!user) {
            const hasPassword = await hashPass(password)
            // I cancel confirmation because manual creation
            const newAdmin = new userModel({ email, password: hasPassword, role, name, gender,  confirmEmail: true })
            const savedUser = await newAdmin.save()
            if (savedUser) {
                console.log(`admin saved: ${savedUser}`);
            } else {
                console.log(`fail to save admin`);
            }
        }
        else {
            console.log('admin exist no need to add him');
        }
    } catch (error) {
        console.log(`catch error: ${error}`);
    }

}
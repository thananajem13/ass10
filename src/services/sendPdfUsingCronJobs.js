import cron from 'node-cron'
import { userModel } from '../../DB/models/user.model.js';
import sendEmail from './email.js';

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const cronJobPdfEmail = () => {

  cron.schedule('* 30 13 * * *', async () => {
    const fullPath = path.join(__dirname, `../../uploads/test.pdf`)
    const users = await userModel.find({    isDeleted: false ,isBlocked: false, confirmEmail: true , role: "user" , $gt: { age: 20 } }).select('email age')
     
    console.log({ users });
    if (!(users.length)) {
      console.log("no user has age greater than 20, so no email sends");
      return "no user has age greater than 20, so no email sends"
    }
    const usersEmail = []
    for (const user of users) {
      usersEmail.push(user.email)

    }
    const attachment = [{   // define custom content type for the attachment
      filename: 'text.pdf',
      path: fullPath,
      contentType: 'application/pdf'

    }]

    const sendMail = sendEmail(usersEmail, "send pdf file", "see pdf file", attachment)
    console.log("done");

  });

}
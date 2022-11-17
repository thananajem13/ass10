import nodemailer from "nodemailer";


async function sendEmail(dest, subject, message , attachments=[]) {
    try {
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDEREMAIL, // generated ethereal user
                pass: process.env.SENDEREMAILPASSWORD, // generated ethereal password
            },
        }); 
        let info = await transporter.sendMail({
            from: `"Route" <${process.env.SENDEREMAIL}>`,
            to: dest,
            subject,
            html: message,
            attachments
        });
        return info
        console.log({attachments});
    } catch (error) {
        console.log('Email Catch error ');
        console.log(error);

    }
}


export  default sendEmail

 
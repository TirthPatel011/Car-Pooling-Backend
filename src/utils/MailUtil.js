const mailer = require('nodemailer');

///function

const sendingMail = async(to,subject,text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
            user:"pateltirth159@gmail.com",
            pass:"ryzj lmwv nnjt qqfu"
        }
    })

    const mailOptions = {
        from: 'pateltirth159@gmail.com',
        to: to,
        subject: subject,
        // text: text
        html: text 
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;

}

module.exports ={
    sendingMail
}
import nodemailer from "nodemailer";
export  const emailTransporter = nodemailer.createTransport({
    service: "Gmail",
	port: 465,
    secure: true, 
	logger: true, 
	debug: true, 
	secureConnection: false,
    auth: {
        user:process.env.EMAIL_SMTP_USERNAME, // Your email
        pass: process.env.EMAIL_SMTP_PASSWORD, // Your email password or app password
    },
	tls:{
rejectUnAuthorized: true
}
});
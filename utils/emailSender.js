import nodemailer from "nodemailer";
export  const emailTransporter = nodemailer.createTransport({
    service: "Gmail",
	port: 465,
    secure: true, 
	logger: true, 
	debug: true, 
	secureConnection: false,
    auth: {
        user:"admin@onenationfoundation.org", // Your email
        pass: "ilhfmqzovrbhncmc", // Your email password or app password
    },
	tls:{
rejectUnAuthorized: true
}
});
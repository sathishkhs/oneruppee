import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import Dashboard from "../models/dashboard.model.js"
import OtpRequestSchema from "../models/OtpRequest.js";
import { emailTransporter } from "../utils/emailSender.js";


export const sendVerificationOTP = async(req,res)=>{
	const { phoneNumber } = req.body;
	// const user = await User.findOne({phoneNumber});
	// if (!user) {
	// 	return res.status(400).json({ error: "Invalid Number" });
	// }
	if(!phoneNumber){
		return res.status(400).json({ message: "Phone number is required" });
	}
	try{
		const otp = Math.floor(100000 + Math.random() * 900000);
		const respoWati = await fetch(`https://live-mt-server.wati.io/333163/api/v1/sendTemplateMessage?whatsappNumber=${phoneNumber}`, {
		   method: "POST",
		   headers: {
			 Authorization: process.env.WATI_TOKEN,
			 "Content-Type": "application/json"
		   },
		   body: JSON.stringify({
			 template_name: "1r_authentication_otp_final",
			 broadcast_name: "1r_authentication_otp_final",
			 parameters: [{ name: "1", value: otp.toString() }]
		   })
		 });
		 const data = await respoWati.json();
		 await OtpRequestSchema.findOneAndUpdate(
			{ phoneNumber },
			{ otp},
			{ upsert: true, new: true }
		  );
		 console.log("WATI response body:", data);
		 return res.status(200).json({ data });
		}catch(err){
			console.log("testttt",err.message)
			return res.status(400).json({ error: "limit expired", message: err.message });
		}
     }

export const verifyOTP=async(req,res)=>{
	try{
		const { phoneNumber,otp } = req.body;
		if(!phoneNumber||!otp){
			return res.status(400).json({ message: "Phone number and OTP is required" });
		}
		const existingUser = await OtpRequestSchema.findOne({ phoneNumber });
		if(existingUser.otp===otp*1){
			return res.status(200).json({ message: "User Verified" });
		}else{
			return res.status(500).json({ error: "Not Verified" });
		}
	}catch{
		return res.status(500).json({ error: "Internal Server Error" });
	}

}	 


export const signup = async (req, res) => {
	try {
		const { name, email, password, confirmPassword, phoneNumber, panNumber, address, dateOfBirth, gender, referralCode } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const existingUser = await User.findOne({ email });

		const existingNumber = await User.findOne({ phoneNumber });
		if (existingNumber) {
			return res.status(400).json({ error: "Number already exists" });
		}
		
		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const profilePic = gender === "male" ? 
			`https://avatar.iran.liara.run/public/boy?username=${email}` : 
			`https://avatar.iran.liara.run/public/girl?username=${email}`;

		// Check if referral code is valid
		let referrer = null;
		if (referralCode) {
			referrer = await User.findOne({ _id: referralCode });
			if (!referrer) {
				return res.status(400).json({ error: "Invalid referral code" });
			}
		}

		// Create new user
		const newUser = new User({
			name,
			email,
			phoneNumber,
			panNumber,
			address,
			password: hashedPassword,
			image: profilePic,
			role: "user",
			dateOfBirth,
			gender,
			referrer: referrer ? referrer._id : null // Store the referrer's ID
		});

		await newUser.save();

		// If user was referred, increase referral count
		if (referrer) {
			await User.findByIdAndUpdate(referrer._id, { $inc: { referralsCount: 1 } });
		}

		generateTokenAndSetCookie(newUser._id, res);
		const respoWati = await fetch(`https://live-mt-server.wati.io/333163/api/v1/sendTemplateMessage?whatsappNumber=${phoneNumber}`, {
			method: "POST",
			headers: {
			  Authorization: process.env.WATI_TOKEN,
			  "Content-Type": "application/json"
			},
			body: JSON.stringify({
			  template_name: "welcome_message_utility",
			  broadcast_name: "welcome_message_utility",
			  parameters: [{ name: "name", value:name}]
			})
		  });
		  const data = await respoWati.json();

		  const mailOptions = {
			from: process.env.EMAIL,
			to: email,
			subject: "Welcome to Onenation foundation!",
			html: `
				<h2>Onenation foundation</h2>
				<p>Hi ${name || ''},</p>
				<p>We're excited to have you on board. Here's to new beginnings and great experiences with us!</p>
				<p>If you have any questions or need help getting started, feel free to reach out.</p>
				<p>Cheers,<br/>The Team</p>
			`,
		};
		

        await emailTransporter.sendMail(mailOptions);

		res.status(201).json({
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			image: newUser.image,
			role: newUser.role,
			phoneNumber: newUser.phoneNumber,
			panNumber: newUser.panNumber,
			address: newUser.address,
			dateOfBirth: newUser.dateOfBirth,
			gender: newUser.gender,
			referrer: newUser.referrer,
			isActive: newUser.isActive
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export const login = async (req, res) => {
	try {
		const { email, password,phoneNumber,isNumberlogin } = req.body;
		const user = await User.findOne(isNumberlogin?{phoneNumber}:{ email });
	
		if(isNumberlogin){
			if (!user) {
				return res.status(400).json({ error: "Invalid Number" });
			}
		}else{
			const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
			if (!user || !isPasswordCorrect) {
				return res.status(400).json({ error: "Invalid username or password" });
			}
		}
	
		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			image: user.image,
			role: user.role,
			phoneNumber:user.phoneNumber,
			panNumber:user.panNumber,
			address:user.address,
			dateOfBirth:user.dateOfBirth,
			gender:user.gender,
			isActive:user.isActive
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: `Internal Server Error ${error.message}`});
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const transporter = nodemailer.createTransport({
    service: "Gmail",
	port: 465,
    secure: true, 
	logger: true, 
	debug: true, 
	secureConnection: false,
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
	tls:{
rejectUnAuthorized: true
}
});


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
		const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                resetPasswordToken: resetToken,
                resetPasswordExpire: Date.now() + 3600000,
            },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(500).json({ error: "Failed to update user with reset token" });
        }

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset Request",
            html: `
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>If you did not request this, please ignore this email.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Reset password email sent" });
    } catch (error) {
        console.error("Error in forgotPassword controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { resetPasswordToken, newPassword } = req.body;

        const user = await User.findOne({
			resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ error: "Invalid or expired reset token." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.resetPasswordExpire = null;
        user.resetPasswordToken = null;

        await user.save();

        res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        console.error("Error in resetPassword controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


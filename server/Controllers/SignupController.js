const User = require("../Models/SignupModel")
const bcrypt = require("bcrypt")
const transporte = require("../Utils/Nodemailer")


const createRecord = async (req, res) => {
    try {
        const { name, email, phoneNumber, password } = req.body
        console.log(req.body)
        const errorMessage = []
        if (!name) errorMessage.push("Name is must required")
        if (!email) errorMessage.push("Email is must required")
        if (!phoneNumber || phoneNumber.length != 10) errorMessage.push("Phone Number is required and must be 10 digits")
        if (!password) errorMessage.push("Password is must required")

        if (errorMessage.length > 0) {
            return res.status(400).json({
                success: false,
                message: errorMessage.join(", ")
            });
        }

        const exitData = await User.findOne({ $or: [{ email: email }, { phoneNumber: phoneNumber }] })
        if (exitData) {
            return res.status(400).json({
                success: false,
                message: exitData.email === email ? "This Email ID already exists" : "This Phone Number already exists"
            })
        }

        const saltRound = 12
        const hastPassword = await bcrypt.hash(password, saltRound)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const newRecord = new User({ name, email, phoneNumber, passwaord: hastPassword, otp: otp })
        await newRecord.save()

        const mailOptions = {
            from: 'bbirthday314@gmail.com',
            to: email,
            subject: 'OTP Verification - Vedic Jyotishi',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>OTP Verification - Vedic Jyotishi</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">
        
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center; font-size: 24px;">
                        Vedic Jyotishi
                    </div>
                    
                    <div style="padding: 30px;">
                        <p style="font-size: 16px; line-height: 1.6; color: #333333;">Dear ${name},</p>
                        <p style="font-size: 16px; line-height: 1.6; color: #333333;">
                            We are excited to have you at Vedic Jyotishi! To complete your signup process, please use the following OTP to verify your email address. The OTP is valid for the next 10 minutes.
                        </p>
                        
                        <div style="background-color: #f1f1f1; padding: 15px; border-radius: 5px; font-size: 24px; letter-spacing: 2px; text-align: center; margin: 20px 0;">
                            ${otp}
                        </div>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #333333;">
                            If you did not request this, please ignore this email.
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #333333;">
                            Best Regards,<br>
                            Team Vedic Jyotishi
                        </p>
                    </div>
                    
                    <div style="background-color: #f7f7f7; padding: 20px; text-align: center; color: #777777; font-size: 14px;">
                        © 2024 Vedic Jyotishi. All rights reserved. <br>
                        Visit our <a href="https://vedicjyotishi.com" style="color: #4CAF50; text-decoration: none;">website</a>.
                    </div>
                </div>
        
                </body>
                </html>
            `
        };

        await transporte.sendMail(mailOptions)

        // // Schedule the deletion of the user record after 10 minutes if still pending
        // setTimeout(async () => {
        //     const deleteResult = await User.deleteOne({ email, status: 'pending', createdAt: { $lt: Date.now() -  60 * 1000 } });
        //     if (deleteResult.deletedCount > 0) {
        //         console.log(`Deleted pending user: ${email}`);
        //     }
        // },  60 * 1000); // 10 minutes

        res.status(200).json({
            success: true,
            message: "Signup initiated. Please verify the OTP sent to your email.",
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email Is Must Required"
            })
        }
        if (!otp) {
            return res.status(400).json({
                success: false,
                message: "Email Is Must Required"
            })
        }
        const checkRecord = await User.findOne({ email: email })
        if (!checkRecord) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }

        const otpExpiryTime = 10 * 60 * 1000; // 10 minutes in milliseconds
        if (Date.now() - new Date(checkRecord.otpCreatedAt).getTime() > otpExpiryTime) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired"
            });
        }

        if (checkRecord.otp != otp) {
            return res.status(404).json({
                success: false,
                message: "Invaild Otp"
            })
        }
        checkRecord.otp = undefined;
        checkRecord.otpCreatedAt = undefined;
        checkRecord.signupStatus = "Verified";

        await checkRecord.save()
        res.status(200).json({
            success: true,
            message: "OTP verified successfully and signup completed"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


module.exports = {
    createRecord, verifyOtp
}
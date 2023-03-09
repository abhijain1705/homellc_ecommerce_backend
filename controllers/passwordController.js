const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/userModule");
const ResetToken = require("../models/forgotPassword");

module.exports.ForgetPassword = async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        // Check if there is an existing reset token document for the user
        let resetToken = await ResetToken.findOne({ email: user.email });

        // If there is an existing reset token document, update it with a new token
        if (resetToken) {
            resetToken.token = crypto.randomBytes(20).toString('hex');
            resetToken.createdAt = new Date();
        } else { // If there is no existing reset token document, create a new one
            resetToken = new ResetToken({
                email: user.email,
                token: crypto.randomBytes(20).toString('hex'),
                createdAt: new Date()
            });
        }
        await resetToken.save();
        // Send an email to the user with a link to reset their password
        const transporter = nodemailer.createTransport({
            // configure the transporter based on your email provider
            service: "gmail",
            auth: {
                user: process.env.MY_EMAIL, // generated ethereal user
                pass: process.env.MY_PASSWORD, // generated ethereal password
            },
        });
        const resetUrl = `${req.protocol}://${req.headers.host}/homellc/passwords/reset-password/${token}`;
        await transporter.sendMail({
            from: 'abhijain3002@gmail.com', // sender address
            to: user.email,
            subject: 'Password Reset Request (Home LLC)',
            html: `Please click this link to reset your password: <a href="${resetUrl}">${resetUrl}</a>`
        });

        res.json({ message: 'Password reset instructions sent to your email' });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};


module.exports.UpdatePassword = async (req, res) => {
    try {
        // Find the reset token
        const resetToken = await ResetToken.findOne({ token: req.params.token });

        if (!resetToken) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Verify that the token is not expired
        if (resetToken.createdAt < new Date(new Date() - 60 * 60 * 1000)) {
            // Token is expired, delete it from the database and return an error
            await resetToken.delete();
            return res.status(400).json({ message: 'Token expired' });
        }

        // Find the user by email
        const user = await User.findOne({ email: resetToken.email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Update the user's password
        user.password = req.body.password;
        await user.save();

        // Delete the reset token from the database
        await resetToken.delete();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        // Create a transporter using Gmail service explicitly
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Define the email options
        const mailOptions = {
            from: `MERN Demo <${process.env.FROM_EMAIL?.trim()}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log(`[Email] OTP sent successfully to ${options.email}. Message ID: ${info.messageId}`);
    } catch (error) {
        console.error('[Email] Failed to send email:', error);
        throw error; // Re-throw to be caught by the controller
    }
};

module.exports = sendEmail;

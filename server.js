const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./'));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please fill in all required fields' 
            });
        }

        // Email to admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #f03528, #d42b1f); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h2>New Contact Message</h2>
                    </div>
                    
                    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p><strong>Message:</strong></p>
                        <p style="background: white; padding: 15px; border-left: 4px solid #f03528; border-radius: 4px;">
                            ${message.replace(/\n/g, '<br>')}
                        </p>
                        <p style="color: #999; font-size: 12px; margin-top: 20px;">
                            <strong>Received:</strong> ${new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            `
        };

        // Confirmation email to user
        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'We Received Your Message - Eduford University',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #f03528, #d42b1f); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h2>Message Received</h2>
                        <p>Thank you for contacting us!</p>
                    </div>
                    
                    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                        <p>Dear <strong>${name}</strong>,</p>
                        
                        <p>Thank you for reaching out to Eduford University. We have received your message and appreciate you taking the time to contact us.</p>
                        
                        <div style="background: white; padding: 20px; border-left: 4px solid #f03528; border-radius: 4px; margin: 20px 0;">
                            <p><strong>Subject:</strong> ${subject}</p>
                            <p><strong>Message:</strong></p>
                            <p>${message.replace(/\n/g, '<br>')}</p>
                        </div>
                        
                        <p>Our team will review your message and get back to you as soon as possible, typically within 24-48 hours.</p>
                        
                        <p>If you have any urgent matters, please feel free to call us at <strong>+91 1234567890</strong> during our business hours (Monday to Saturday, 9am to 10pm).</p>
                        
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                        
                        <p>Best regards,<br><strong>Eduford University Team</strong></p>
                        <p style="color: #999; font-size: 12px; margin-top: 20px;">This is an automated email. Please do not reply to this email.</p>
                    </div>
                </div>
            `
        };

        // Send both emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        res.status(200).json({ 
            success: true, 
            message: 'Message sent successfully! We will get back to you soon.' 
        });

    } catch (error) {
        console.error('Email Error:', error.message);
        console.error('Full Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message. Error: ' + error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
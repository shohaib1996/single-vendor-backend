import nodemailer from 'nodemailer';
import config from '../../config';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
) => {
  try {
    await transporter.sendMail({
      from: `"Nice Company" <${config.EMAIL_USER}>`, // sender address
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

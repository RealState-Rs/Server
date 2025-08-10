import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import AppError from "../utils/AppError";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Renders an EJS template with data
async function renderTemplate(templateName: string, data: Record<string, any>) {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "views",
    "emails",
    `${templateName}.ejs`
  );
  return await ejs.renderFile(templatePath, data);
}

export async function sendEmailTemplate(
  to: string,
  subject: string,
  templateName: string,
  data: Record<string, any>,
  attachments?: any[]
) {
  try {
    const html = await renderTemplate(templateName, data);

    const mailOptions = {
      from: `"RS" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent: ${info.response}`);
    return true;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new AppError("Failed to send email", 500);
  }
}

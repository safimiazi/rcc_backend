import nodemailer from "nodemailer";
const MAIL_HOST = "";
const MAIL_PORT = 587;
const MAIL_USER = "";
const MAIL_PASS = "";
const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

async function SendEmail({
  to,
  bcc,
  subject,
  text = "Something went wrong! Update Mail Application this email is for loi request",
  html,
  attachments,
}) {
  try {
    const mailResponse = await transporter.sendMail({
      from: `"" <${MAIL_USER}>`,
      to,
      bcc,
      subject,
      text,
      html,
      attachments,
    });
    return { send: mailResponse.messageId };
  } catch (error) {
    console.log("🚀 ~ SendEmail ~ error:", error);
    return { send: false, err: error, message: error.message };
  }
}
module.exports = SendEmail;

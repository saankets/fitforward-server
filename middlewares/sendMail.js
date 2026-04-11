import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ================= OTP MAIL =================
const sendMail = async (email, subject, data) => {
  const html = `
  <div style="font-family: Arial; text-align:center;">
    <h1 style="color:red;">OTP Verification</h1>
    <p>Hello ${data.name}, your OTP is:</p>
    <h2 style="color:purple;">${data.otp}</h2>
  </div>
  `;

  const msg = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject,
    html,
  };

  await sgMail.send(msg);
};

export default sendMail;


// ================= FORGOT PASSWORD MAIL =================
export const sendForgotMail = async (subject, data) => {
  const html = `
  <div style="font-family: Arial;">
    <h1>Reset Your Password</h1>
    <p>You requested a password reset.</p>
    <a href="${process.env.frontendurl}/reset-password/${data.token}"
       style="padding:10px 20px; background:#5a2d82; color:white; text-decoration:none;">
       Reset Password
    </a>
  </div>
  `;

  const msg = {
    to: data.email,
    from: process.env.EMAIL_FROM,
    subject,
    html,
  };

  await sgMail.send(msg);
};

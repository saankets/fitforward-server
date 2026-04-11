import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ================= OTP MAIL =================
export const sendOtpMail = async (email, data) => {
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
    subject: "OTP Verification",
    html,
  };

  await sgMail.send(msg);
};


// ================= FORGOT PASSWORD MAIL =================
export const sendForgotMail = async (data) => {
  const resetLink = `${process.env.frontendurl}/reset-password/${data.token}`;

  const html = `
    <div style="font-family: Arial;">
      <h1>Password Reset Request</h1>
      <p>Hello ${data.name},</p>
      <p>Click below to reset your password:</p>

      <a href="${resetLink}"
         style="padding:10px 20px; background:#5a2d82; color:white; text-decoration:none; border-radius:5px;">
         Reset Password
      </a>

      <p>If you did not request this, ignore this email.</p>
    </div>
  `;

  const msg = {
    to: data.email,
    from: process.env.EMAIL_FROM,
    subject: "Reset Your Password",
    html,
  };

  await sgMail.send(msg);
};

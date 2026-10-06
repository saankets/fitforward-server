import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ================= OTP MAIL =================
const sendMail = async (email, subject, data) => {
  const html = `
  <div style="font-family: Arial; text-align:center;">
    <h1 style="color:red;">OTP Verification</h1>
    <p>Hello ${data.name}, your OTP is:</p>
    <h2 style="color:purple;">${data.otp}</h2>
  </div>
  `;

  const { data: result, error } = await resend.emails.send({
    from: 'FitForward <onboarding@resend.dev>',
    to: [email],
    subject,
    html,
  });

  if (error) {
    console.error('Resend OTP error:', error);
    throw new Error(error.message);
  }

  return result;
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

  const { data: result, error } = await resend.emails.send({
    from: 'FitForward <onboarding@resend.dev>',
    to: [data.email],
    subject,
    html,
  });

  if (error) {
    console.error('Resend forgot-password error:', error);
    throw new Error(error.message);
  }

  return result;
};

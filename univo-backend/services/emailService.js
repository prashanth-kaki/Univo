// services/emailService.js

const nodemailer =
  require('nodemailer');

// ======================================
// EMAIL TRANSPORTER
// ======================================

const transporter =
  nodemailer.createTransport({

    service: 'gmail',

    auth: {

      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },
  });

// ======================================
// VERIFY CONNECTION
// ======================================

transporter.verify(
  (error) => {

    if (error) {

      console.error(
        'EMAIL CONFIG ERROR:',
        error
      );

    } else {

      console.log(
        '✅ Email service connected successfully'
      );

      console.log(
        'EMAIL USER:',
        process.env.EMAIL_USER
      );
    }
  }
);

// ======================================
// COMMON EMAIL TEMPLATE
// ======================================

const emailWrapper = (
  title,
  content
) => {

  return `

  <div style="
    font-family: Arial, sans-serif;
    background: #f4f7fb;
    padding: 40px 20px;
  ">

    <div style="
      max-width: 650px;
      margin: auto;
      background: white;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    ">

      <!-- HEADER -->

      <div style="
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        padding: 30px;
        text-align: center;
      ">

        <h1 style="
          color: white;
          margin: 0;
          font-size: 32px;
        ">
          Univo
        </h1>

        <p style="
          color: rgba(255,255,255,0.85);
          margin-top: 8px;
          font-size: 15px;
        ">
          Smart University Platform
        </p>

      </div>

      <!-- BODY -->

      <div style="
        padding: 35px;
      ">

        <h2 style="
          color: #111827;
          margin-top: 0;
        ">
          ${title}
        </h2>

        ${content}

      </div>

      <!-- FOOTER -->

      <div style="
        padding: 20px;
        text-align: center;
        background: #f9fafb;
        border-top: 1px solid #e5e7eb;
      ">

        <p style="
          color: #6b7280;
          font-size: 13px;
          margin: 0;
        ">
          © ${new Date().getFullYear()} Univo.
          All rights reserved.
        </p>

      </div>

    </div>
  </div>
  `;
};

// ======================================
// SEND OTP EMAIL
// ======================================

const sendOTPEmail =
  async (
    email,
    otp,
    purpose = 'Verification'
  ) => {

    try {

      console.log(
        'SENDING OTP EMAIL TO:',
        email
      );

      const html =
        emailWrapper(

          `${purpose} OTP`,

          `
          <p style="
            font-size: 16px;
            color: #374151;
          ">
            Your OTP for
            <strong>${purpose}</strong>
            is:
          </p>

          <div style="
            text-align: center;
            margin: 35px 0;
          ">

            <span style="
              display: inline-block;
              background: #eef2ff;
              color: #4f46e5;
              font-size: 38px;
              font-weight: bold;
              letter-spacing: 10px;
              padding: 18px 36px;
              border-radius: 14px;
            ">
              ${otp}
            </span>

          </div>

          <p style="
            color: #6b7280;
            font-size: 14px;
          ">
            This OTP will expire
            in 10 minutes.
          </p>

          <p style="
            color: #6b7280;
            font-size: 14px;
          ">
            If you did not request this,
            please ignore this email.
          </p>
          `
        );

      const mailOptions = {

        from:
          `"Univo" <${process.env.EMAIL_USER}>`,

        to: email,

        subject:
          `Univo ${purpose} OTP`,

        html,
      };

      const info =
        await transporter.sendMail(
          mailOptions
        );

      console.log(
        'OTP EMAIL SENT:',
        info.response
      );

      return info;

    } catch (error) {

      console.error(
        'OTP EMAIL ERROR:',
        error
      );

      throw new Error(
        'Failed to send OTP email'
      );
    }
  };

// ======================================
// SEND ACCOUNT CREATED EMAIL
// ======================================

const sendAccountCreatedEmail =
  async ({
    name,
    email,
    password,
    role,
    branch,
  }) => {

    try {

      console.log(
        'SENDING ACCOUNT EMAIL TO:',
        email
      );

      const html =
        emailWrapper(

          'Your Univo Account Has Been Created',

          `
          <p style="
            font-size: 16px;
            color: #374151;
          ">
            Hello
            <strong>${name}</strong>,
          </p>

          <p style="
            font-size: 15px;
            color: #4b5563;
            line-height: 1.7;
          ">
            Your Univo account has been created successfully.
          </p>

          <div style="
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
          ">

            <p>
              <strong>Role:</strong>
              ${role}
            </p>

            <p>
              <strong>Department:</strong>
              ${branch}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Temporary Password:</strong>
              ${password}
            </p>

          </div>

          <p style="
            font-size: 15px;
            color: #374151;
          ">
            Login here:
          </p>

          <a
            href="http://localhost:3000/login"
            style="
              display: inline-block;
              background: #4f46e5;
              color: white;
              text-decoration: none;
              padding: 12px 22px;
              border-radius: 10px;
              font-weight: 600;
            "
          >
            Login to Univo
          </a>

          <p style="
            margin-top: 30px;
            color: #ef4444;
            font-size: 14px;
          ">
            Please change your password
            after your first login.
          </p>
          `
        );

      const mailOptions = {

        from:
          `"Univo" <${process.env.EMAIL_USER}>`,

        to: email,

        subject:
          'Your Univo Account Has Been Created',

        html,
      };

      const info =
        await transporter.sendMail(
          mailOptions
        );

      console.log(
        'ACCOUNT EMAIL SENT:',
        info.response
      );

      return info;

    } catch (error) {

      console.error(
        'ACCOUNT EMAIL ERROR:',
        error
      );

      throw new Error(
        'Failed to send account creation email'
      );
    }
  };

// ======================================
// SEND PASSWORD RESET SUCCESS EMAIL
// ======================================

const sendPasswordChangedEmail =
  async (
    email,
    name
  ) => {

    try {

      console.log(
        'SENDING PASSWORD EMAIL TO:',
        email
      );

      const html =
        emailWrapper(

          'Password Changed Successfully',

          `
          <p style="
            font-size: 16px;
            color: #374151;
          ">
            Hello
            <strong>${name}</strong>,
          </p>

          <p style="
            font-size: 15px;
            color: #4b5563;
            line-height: 1.7;
          ">
            Your Univo account password
            has been changed successfully.
          </p>

          <p style="
            color: #ef4444;
            font-size: 14px;
            margin-top: 20px;
          ">
            If you did not perform this action,
            please contact support immediately.
          </p>
          `
        );

      const mailOptions = {

        from:
          `"Univo" <${process.env.EMAIL_USER}>`,

        to: email,

        subject:
          'Univo Password Changed',

        html,
      };

      const info =
        await transporter.sendMail(
          mailOptions
        );

      console.log(
        'PASSWORD CHANGED EMAIL SENT:',
        info.response
      );

      return info;

    } catch (error) {

      console.error(
        'PASSWORD EMAIL ERROR:',
        error
      );

      throw new Error(
        'Failed to send password change email'
      );
    }
  };

// ======================================
// EXPORTS
// ======================================

module.exports = {

  sendOTPEmail,

  sendAccountCreatedEmail,

  sendPasswordChangedEmail,
};
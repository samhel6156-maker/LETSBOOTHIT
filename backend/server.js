const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.send("Backend is working");
});

// ✅ Fixed transporter - no auth for Mailpit
const transporter = nodemailer.createTransport({
  host: '127.0.0.1',
  port: 1025,
  secure: false,
  auth: false,
  tls: {
    rejectUnauthorized: false
  }
});

app.post("/api/booking", async (req, res) => {
  const {
    first_name, last_name, middle_initial, suffix,
    email, phone, event_date, event_location,
    booth_type, package: pkg, payment_method,
  } = req.body;

  if (!first_name || !last_name || !email || !event_date || !event_location || !booth_type || !pkg || !payment_method) {
    return res.status(400).json({ errors: { general: "Missing required fields." } });
  }

  // ✅ Fixed middle initial formatting
  const middleInitial = middle_initial
    ? middle_initial.replace('.', '') + '.'
    : null;

  const fullName = [first_name, middleInitial, last_name, suffix]
    .filter(Boolean)
    .join(" ");

  const formattedDate = new Date(event_date).toLocaleString("en-PH", {
    dateStyle: "full",
    timeStyle: "short",
  });

  try {
    const [customerMail, ownerMail] = await Promise.allSettled([
      transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Booking Request Received - Let's Booth It",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #d97706;">Hi ${fullName}!</h2>
            <p>Thank you for your booking request. We've received your details and will be in touch shortly to confirm.</p>
            <hr style="border-color: #333;" />
            <h3>Booking Summary</h3>
            <p><strong>Event Date:</strong> ${formattedDate}</p>
            <p><strong>Location:</strong> ${event_location}</p>
            <p><strong>Booth Type:</strong> ${booth_type}</p>
            <p><strong>Package:</strong> ${pkg}</p>
            <p><strong>Payment Method:</strong> ${payment_method}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <hr style="border-color: #333;" />
            <p style="color: #888;">Let's Booth It Photobooth</p>
          </div>
        `,
      }),

      transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: process.env.OWNER_EMAIL,
        subject: `New Booking Request from ${fullName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #d97706;">New Booking Request!</h2>
            <p>A new booking request has been submitted.</p>
            <hr style="border-color: #333;" />
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <h3>Booking Details</h3>
            <p><strong>Event Date:</strong> ${formattedDate}</p>
            <p><strong>Location:</strong> ${event_location}</p>
            <p><strong>Booth Type:</strong> ${booth_type}</p>
            <p><strong>Package:</strong> ${pkg}</p>
            <p><strong>Payment Method:</strong> ${payment_method}</p>
            <hr style="border-color: #333;" />
            <p style="color: #888;">Let's Booth It Admin Notification</p>
          </div>
        `,
      }),
    ]);

    console.log('Customer email:', customerMail.status);
    console.log('Owner email:', ownerMail.status);

    if (customerMail.status === 'rejected') {
      console.error('Customer email failed:', customerMail.reason);
    }
    if (ownerMail.status === 'rejected') {
      console.error('Owner email failed:', ownerMail.reason);
    }

    res.status(201).json({ message: "Booking submitted successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
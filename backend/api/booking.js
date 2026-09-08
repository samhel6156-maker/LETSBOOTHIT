const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false }
});

const BACKDROP_LABELS = {
    solid: "Solid Color",
    sequin: "Sequin Glam",
    floral: "Floral Wall",
};

const DURATION_LABELS = {
    "2h": "2 Hours",
    "3h": "3 Hours",
    "4h": "4 Hours",
};

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const {
        package: pkg,
        booth_type,
        backdrop,
        duration,
        event_date,
        start_time,
        event_type,
        venue,
        guest_count,
        special_requests,
        full_name,
        email,
        phone,
        total,
    } = req.body;

    if (!full_name || !email || !phone || !event_date || !start_time || !event_type || !venue || !pkg) {
        return res.status(400).json({ errors: { general: "Missing required fields." } });
    }

    const formattedDate = new Date(event_date).toLocaleDateString("en-PH", {
        dateStyle: "full",
    });

    const backdropLabel = BACKDROP_LABELS[backdrop] ?? backdrop;
    const durationLabel = DURATION_LABELS[duration] ?? duration;
    const boothLabel = booth_type === "premium" ? "Premium Booth" : "Classic Booth";

    try {
        await Promise.all([
            transporter.sendMail({
                from: process.env.MAIL_FROM,
                to: email,
                subject: "Booking Request Received - Let's Booth It",
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #d97706;">Hi ${full_name}!</h2>
                        <p>Thank you for your booking request. We've received your details and will be in touch shortly to confirm.</p>
                        <hr style="border-color: #333;" />
                        <h3>Booking Summary</h3>
                        <p><strong>Package:</strong> ${pkg}</p>
                        <p><strong>Booth Type:</strong> ${boothLabel}</p>
                        <p><strong>Backdrop:</strong> ${backdropLabel}</p>
                        <p><strong>Duration:</strong> ${durationLabel}</p>
                        <p><strong>Event Date:</strong> ${formattedDate}</p>
                        <p><strong>Start Time:</strong> ${start_time}</p>
                        <p><strong>Event Type:</strong> ${event_type}</p>
                        <p><strong>Venue:</strong> ${venue}</p>
                        ${guest_count ? `<p><strong>Estimated Guests:</strong> ${guest_count}</p>` : ''}
                        ${special_requests ? `<p><strong>Special Requests:</strong> ${special_requests}</p>` : ''}
                        <p><strong>Total:</strong> ₱${Number(total).toLocaleString()}</p>
                        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                        <hr style="border-color: #333;" />
                        <p style="color: #888;">Let's Booth It Photobooth</p>
                    </div>
                `,
            }),
            transporter.sendMail({
                from: process.env.MAIL_FROM,
                to: process.env.OWNER_EMAIL,
                subject: `New Booking Request from ${full_name}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #d97706;">New Booking Request!</h2>
                        <p>A new booking request has been submitted.</p>
                        <hr style="border-color: #333;" />
                        <h3>Customer Details</h3>
                        <p><strong>Name:</strong> ${full_name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                        <h3>Booking Details</h3>
                        <p><strong>Package:</strong> ${pkg}</p>
                        <p><strong>Booth Type:</strong> ${boothLabel}</p>
                        <p><strong>Backdrop:</strong> ${backdropLabel}</p>
                        <p><strong>Duration:</strong> ${durationLabel}</p>
                        <p><strong>Event Date:</strong> ${formattedDate}</p>
                        <p><strong>Start Time:</strong> ${start_time}</p>
                        <p><strong>Event Type:</strong> ${event_type}</p>
                        <p><strong>Venue:</strong> ${venue}</p>
                        ${guest_count ? `<p><strong>Estimated Guests:</strong> ${guest_count}</p>` : ''}
                        ${special_requests ? `<p><strong>Special Requests:</strong> ${special_requests}</p>` : ''}
                        <p><strong>Total:</strong> ₱${Number(total).toLocaleString()}</p>
                        <hr style="border-color: #333;" />
                        <p style="color: #888;">Let's Booth It Admin Notification</p>
                    </div>
                `,
            }),
        ]);

        res.status(201).json({ message: "Booking submitted successfully!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong." });
    }
}
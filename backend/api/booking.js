const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const {
        first_name, last_name, middle_initial, suffix,
        email, phone, event_date, event_location,
        package: pkg, payment_method,
    } = req.body;

    if (!first_name || !last_name || !email || !event_date || !event_location || !pkg || !payment_method) {
        return res.status(400).json({ errors: { general: "Missing required fields." } });
    }

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
        await Promise.all([
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
                        <p><strong>Package:</strong> ${pkg}</p>
                        <p><strong>Payment Method:</strong> ${payment_method}</p>
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
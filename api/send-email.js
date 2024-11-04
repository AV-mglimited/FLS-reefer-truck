// api/send-email.js
import fetch from "node-fetch";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { formData } = req.body;

    try {
        const response = await fetch(`https://api.mailjet.com/v3.1/send`, {
            method: "POST",
            headers: {
                Authorization:
                    "Basic " +
                    Buffer.from(
                        `${process.env.MJ_APIKEY_PUBLIC}:${process.env.MJ_APIKEY_PRIVATE}`
                    ).toString("base64"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Messages: [
                    {
                        From: {
                            Email: process.env.MJ_SENDER_EMAIL,
                            Name: "Digital Ads - FLS Cont Lạnh",
                        },
                        To: [
                            {
                                Email: process.env.MJ_RECEIVER_EMAIL,
                                Name: "Admin",
                            },
                        ],
                        Subject: "[Digital Ads - FLS Cont Lạnh] Khách hàng mới",
                        HTMLPart: `
              <h3>New Consultation Request</h3>
              <p><strong>Name:</strong> ${formData.contactName}</p>
              <p><strong>Phone Number:</strong> ${formData.contactPhoneNumber}</p>
              <p><strong>Email:</strong> ${formData.contactEmail}</p>
              <p><strong>Request:</strong> ${formData.contactRequest}</p>
            `,
                    },
                ],
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json({ message: "Email sent successfully" });
        } else {
            console.error("Mailjet API error:", data);
            return res
                .status(response.status)
                .json({ error: "Failed to send email via Mailjet" });
        }
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

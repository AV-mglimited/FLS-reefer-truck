const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { formData } = req.body;

    if (!formData) {
        console.error('formData is undefined');
        console.log('req.body:', req.body);
        return res.status(400).json({ error: 'formData is required' });
    }

    try {
        console.log("Sending email with formData:", formData);

        const mailjetResponse = await axios.post(
            'https://api.mailjet.com/v3.1/send',
            {
                Messages: [
                    {
                        From: {
                            Email: process.env.MJ_SENDER_EMAIL,
                            Name: 'Digital Ads - FLS Cont Lạnh',
                        },
                        To: [
                            {
                                Email: process.env.MJ_RECEIVER_EMAIL,
                                Name: 'Admin',
                            },
                        ],
                        Subject: '[Digital Ads - FLS Cont Lạnh] Khách hàng mới',
                        HTMLPart: `
                            <h3>New Consultation Request</h3>
                            <p><strong>Name:</strong> ${formData.contactName}</p>
                            <p><strong>Phone Number:</strong> ${formData.contactPhoneNumber}</p>
                            <p><strong>Email:</strong> ${formData.contactEmail}</p>
                            <p><strong>Request:</strong> ${formData.contactRequest}</p>
                          `,
                    },
                ],
            },
            {
                auth: {
                    username: process.env.MJ_APIKEY_PUBLIC,
                    password: process.env.MJ_APIKEY_PRIVATE,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("Mailjet response status:", mailjetResponse.status);
        console.log("Mailjet response data:", mailjetResponse.data);

        if (mailjetResponse.status === 200) {
            return res.status(200).json({ message: 'Email sent successfully' });
        } else {
            console.error('Mailjet API error:', mailjetResponse.data);
            return res.status(mailjetResponse.status).json({ error: 'Failed to send email via Mailjet' });
        }
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

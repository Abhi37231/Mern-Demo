const sendEmail = async (options) => {
    try {
        const apiKey = process.env.BREVO_API_KEY;
        if (!apiKey) {
            console.error('[Email] BREVO_API_KEY is not set in environment variables');
            throw new Error('Missing API Key');
        }

        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': apiKey,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                sender: { 
                    email: process.env.FROM_EMAIL?.trim() || 'noreply@merndemo.com', 
                    name: 'MERN Demo' 
                },
                to: [{ email: options.email }],
                subject: options.subject,
                textContent: options.message
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            console.error('[Email] Brevo API Error:', errData);
            throw new Error('Failed to send email via Brevo');
        }

        console.log(`[Email] OTP sent successfully to ${options.email} via Brevo!`);
    } catch (error) {
        console.error('[Email] Failed to send email:', error.message);
        throw error;
    }
};

module.exports = sendEmail;

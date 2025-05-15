
export async function POST(req) {
    const { nom, email, message } = await req.json();

    const payloadToYou = {
        sender: { name: "Nouveau message de contact", email: "primisimmo@gmail.com" },
        to: [{ email: "primisimmo@gmail.com", name: "Vous" }],
        subject: `Nouveau message de ${nom}`,
        textContent: `Nom: ${nom}\nEmail: ${email}\nMessage: ${message}`
    };

    const payloadToClient = {
        sender: { name: "Résidences PRIMIS", email: "primisimmo@gmail.com" },
        to: [{ email: email, name: nom }],
        templateId: 1,
        params: { name: nom },
    };

    const headers = {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_CONTACT_API_KEY,
    };

    const sendToYou = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers,
        body: JSON.stringify(payloadToYou),
    });

    const sendToClient = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers,
        body: JSON.stringify(payloadToClient),
    });

    if (sendToYou.ok && sendToClient.ok) {
        return Response.json({ success: true });
    } else {
        return Response.json({ success: false }, { status: 500 });
    }
}

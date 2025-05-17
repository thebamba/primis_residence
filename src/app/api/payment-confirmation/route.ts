import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { user_name, email, unit_type, dates, total_price } = await req.json();

    const payloadToClient = {
        sender: { name: "Résidences PRIMIS", email: "contact@residencesprimis.com" },
        to: [{ email, name: user_name }],
        templateId: 2,
        params: {
            name: user_name,
            unit_type: unit_type,
            dates: dates,
            total_price: total_price,
        },
    };

    const payloadToYou = {
        sender: { name: "Notification Résidences PRIMIS", email: "contact@residencesprimis.com" },
        to: [{ email: "contact@residencesprimis.com", name: "Gestionnaire PRIMIS" }],
        subject: `Nouvelle réservation confirmée de ${user_name}`,
        textContent: `Nom: ${user_name}\nEmail: ${email}\nUnité: ${unit_type}\nDates: ${dates}\nMontant payé: ${total_price}`
    };



    const headers = {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_CONTACT_API_KEY!,
    };

    const sendToClient = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers,
        body: JSON.stringify(payloadToClient),
    });

    const sendToYou = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers,
        body: JSON.stringify(payloadToYou),
    });

    if (sendToClient.ok && sendToYou.ok) {
        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

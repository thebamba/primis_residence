// src/app/api/checkout_sessions/route.ts
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' });


export async function POST(req: Request) {
    const { unitType, total } = await req.json();

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'xof',
                product_data: { name: unitType },
                unit_amount: parseInt(total),
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reserver/checkout-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reserver/checkout-cancel`,
    });


    return NextResponse.json({ url: session.url });
}
